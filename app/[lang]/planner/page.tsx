import { Locale } from '@/i18n.config'
import { prisma } from '@/lib/db/prisma'
import React from 'react'
import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function page({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const session = await getServerSession(authOptions)

  const {metadataLocal} = await getDictionary(lang)

  metadata.title = metadataLocal.explore + ' | Sanal Rehberim'

  return (
    <div className="py-10 flex items-center justify-center md:p-12 mx-auto max-w-7xl">
      <h1 className="text-3xl font-semibold">Yapay Zeka Seyehat Planlayıcı</h1>
      <p>Çok yakında geliyor...</p>
    </div>
  )
}
