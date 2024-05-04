import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from '@/components/BootstrapClient.Component';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: process.env.NEXT_PUBLIC_APP_NAME,
	description: process.env.NEXT_PUBLIC_DESCRIPTION,
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={inter.className}>{children}</body>
			<BootstrapClient />
		</html>
	);
}
