import { prisma } from '@/_lib/prisma';
import NextAuth, { AuthOptions, User } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';

export const authOptions: AuthOptions = {
	providers: [
		Credentials({
			id: 'credentials',
			name: 'Credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'usuario@email.com',
				},
				password: {
					label: 'Contraseña',
					type: 'password',
					placeholder: '••••••',
				},
			},
			async authorize(credentials, req) {
				if (!credentials) {
					throw new Error('¿Y las credenciales?');
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials?.email,
					},
				});

				if (!user) {
					throw new Error(
						'No se encontro ningun usuario con ese Email',
					);
				}

				if (await bcrypt.compare(credentials.password, user.password)) {
					return {
						id: String(user.id),
						email: user.email,
						name: user.username,
					} as User;
				} else {
					throw new Error('Por favor comprueba tu contraseña.');
				}
			},
		}),
	],
	pages: {
		signIn: '/log-in/',
	},
	session: {
		strategy: 'jwt',
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
