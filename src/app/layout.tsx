import type { Metadata } from 'next';
import '@/styles/bootstrap.scss';
import '@/styles/globals.scss';
import './Layout.css';
import BootstrapClient from '@/components/BootstrapClient';

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
		<html lang='en' /* data-bs-theme='dark' */>
			<body className={`bg-body`}>
				<div id='root'>{children}</div>
				<BootstrapClient />
			</body>
		</html>
	);
}
