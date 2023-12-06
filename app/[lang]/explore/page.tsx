import { Locale } from '@/i18n.config'
import { prisma } from '@/lib/db/prisma'
import Image from 'next/image'
import React from 'react'
import PlaceCard from '../../../components/PlaceCard'

export default async function page({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const places = await prisma.place.findMany({
    orderBy: {id: "desc"}
  })

  return (
    <div className="py-10 px-4 md:p-12">
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mx-auto max-w-7xl">
        {places.map((place) => (
          <PlaceCard
          key={place.id}
          place={place}
          lang={lang}
          />
        ))}
      </div>
    </div>
  )
}
