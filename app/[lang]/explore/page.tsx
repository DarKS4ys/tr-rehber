import { Locale } from '@/i18n.config'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import React from 'react'
import PlaceCard from '../../../components/PlaceCard'
import { Metadata } from 'next'
import { getDictionary } from '@/lib/dictionary'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { Toaster } from 'sonner'

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
  const {savePlaceNotification} = await getDictionary(lang)

  const places = await prisma.place.findMany({
    orderBy: {id: "desc"}
  })

  metadata.title = metadataLocal.explore + ' | Sanal Rehberim'

  return (
    <div className="py-10 px-4 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto max-w-7xl">
        {places.map((place) => (
          <PlaceCard
          key={place.id}
          place={place}
          lang={lang}
          savePlaceLocal={savePlaceNotification}
          user={session?.user}
          />
        ))}
      </div>

      <Toaster/>
    </div>
  )
}
