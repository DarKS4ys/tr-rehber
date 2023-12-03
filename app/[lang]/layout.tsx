import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Locale } from '@/i18n.config';
import { getDictionary } from '@/lib/dictionary';
import Providers from './providers';
import { LanguageProvider } from './languageContext';
import Navbar from '@/components/Navbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { EdgeStoreProvider } from '@/lib/edgestore';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Türkiye Rehberim',
  description: 'Tr Rehber',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: Locale };
}) {

  const {page} = await getDictionary(params.lang)
  const session = await getServerSession(authOptions)
  return (
    <html lang={params.lang}>
      <body className={inter.className}>
      <Providers>
        <LanguageProvider initialLanguage={params.lang}>
          <EdgeStoreProvider>
            <Navbar lang={params.lang} navbar={page.navbar} session={session || null}/>
            <div className='max-w-8xl m-auto min-w-[300px]'>
              {children}
            </div>
          </EdgeStoreProvider>
        </LanguageProvider>
      </Providers>  
      </body>
    </html>
  );
}
