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
import Footer from '@/components/Footer/Footer';
import Feedback from './../../components/Feedback';
import { AI } from '@/actions/ai';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması',
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
            <AI>
            <Navbar lang={params.lang} navbar={page.navbar} session={session || null}/>
            <div className='max-w-8xl m-auto min-w-[300px]'>
              {children}
            </div>
            <Feedback user={session?.user} feedbackLocal={page.feedback}/>
            <Footer footer={page.footer}/>
            </AI>
          </EdgeStoreProvider>
        </LanguageProvider>
      </Providers>  
      </body>
    </html>
  );
}
