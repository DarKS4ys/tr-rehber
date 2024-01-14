import Contact from '@/components/Contact/Contact'
import Features from '@/components/Features'
import Middle from '@/components/Middle/Middle'
import Header from '@/components/OldHeader'
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

  return (
    <main>
      {/* <Header allPlaces={allPlaces} aleo={aleo} lang={lang}/> */}
      <Header header={page.header}/>
      <Features featuresLocalization={page.tiltCards}/>
      <Middle middle={page.middle}/>
      <Contact contact={page.contact}/>
    </main>
  )
}
