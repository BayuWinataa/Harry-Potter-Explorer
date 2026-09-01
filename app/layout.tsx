import type { Metadata } from 'next';
import { Geist_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Navbar } from '@/components/navbar';
import './globals.css';

const harryPotter = localFont({
	src: './fonts/harry-potter.woff',
	variable: '--font-display',
});

// Sofia Sans (Fontshare, self-hosted) — variable font for body text
const sofiaSans = localFont({
	src: './fonts/sofia-sans.woff2',
	variable: '--font-sans',
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Harry Potter Explorer',
	description: 'Explore the magical world of Harry Potter - characters, spells, potions, and more',
	metadataBase: new URL(
		process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
	),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en" className={`${harryPotter.variable} ${sofiaSans.variable} ${geistMono.variable} h-full antialiased dark`}>
			<body className="min-h-full flex flex-col">
				<Navbar />
				{children}
			</body>
		</html>
	);
}