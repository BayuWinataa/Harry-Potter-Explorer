import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Navbar } from '@/components/navbar';
import { Providers } from './providers';
import './globals.css';

const harryPotter = localFont({
	src: './fonts/harry-potter.woff',
	variable: '--font-display',
});

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Harry Potter Explorer',
	description: 'Explore the magical world of Harry Potter - characters, spells, potions, and more',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${harryPotter.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}>
			<body className="min-h-full flex flex-col">
				<Navbar />
				<Providers>{children}</Providers>
			</body>
		</html>
	);
}