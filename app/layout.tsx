import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from '@/context/toaster-context';
import './globals.css';
import { SessionProvider } from 'next-auth/react';
import { auth } from '@/auth';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Created Felipe Ladino',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={inter.className}>
          <ToasterContext />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
