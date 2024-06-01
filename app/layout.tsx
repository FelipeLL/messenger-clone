import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import ToasterContext from '@/context/toaster-context';
import './globals.css';
import AuthContext from '@/context/auth-context';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Messenger Clone',
  description: 'Created Felipe Ladino',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          {children}
        </AuthContext>
      </body>
    </html>
  );
}
