import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Providers from '../[lang]/providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Giriş Yap | Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const {page} = await getDictionary("en")
  const session = await getServerSession(authOptions)

  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        <Navbar lang={"en"} navbar={page.navbar} session={session || null}/>
        {children}
      </Providers>  
      </body>
    </html>
  );
}