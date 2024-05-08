import { BackgroundBeamsDemo } from '@/components/BgBeams'
import Contact from '@/components/Contact/Contact'
import Features from '@/components/Features'
import Middle from '@/components/Middle/Middle'
import Header from '@/components/OldHeader'
import TemporaryPlayer from '@/components/temporary-player'
import { Locale } from '@/i18n.config'
import { getDictionary } from '@/lib/dictionary'
export default async function Home({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const { page } = await getDictionary(lang)

  return (
    <main>
      <Header lang={lang} header={page.header}/>
      <Features featuresLocalization={page.tiltCards}/>
      <Middle middle={page.middle}/>
      <BackgroundBeamsDemo lang={lang}/>
      <Contact contact={page.contact}/>


      <TemporaryPlayer/>
    </main>
  )
}
