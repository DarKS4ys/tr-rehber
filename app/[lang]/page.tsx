import Contact from '@/components/Contact/Contact'
import Header from '@/components/Header'
import Middle from '@/components/Middle/Middle'
import { Locale } from '@/i18n.config'
import { prisma } from '@/lib/db/prisma'
import { getDictionary } from '@/lib/dictionary'
import { Aleo } from 'next/font/google';

const aleo = Aleo({ subsets: ['latin'] });

export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const { page } = await getDictionary(lang)
  
  const allPlaces = await prisma.placeSnippet.findMany({});

  return (
    <main>
      <Header allPlaces={allPlaces} aleo={aleo} lang={lang}/>
      <Contact contact={page.contact}/>
      <Middle middle={page.middle}/>
      <Contact contact={page.contact}/>
    </main>
  )
}
