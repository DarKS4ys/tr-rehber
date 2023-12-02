import Contact from '@/components/Contact/Contact'
import Middle from '@/components/Middle/Middle'
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
      <Contact contact={page.contact}/>
      <Middle middle={page.middle}/>
      <Contact contact={page.contact}/>
    </main>
  )
}
