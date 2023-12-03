import { Locale } from '@/i18n.config'
import { prisma } from '@/lib/db/prisma'
import React from 'react'

export default async function page({
  params: {lang}
}: {
  params: {lang: Locale}
}) {

  const places = await prisma.place.findMany({
    orderBy: {id: "desc"}
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
      {places.map((place) => (
        <div key={place.id}>
          <h2>{(place.name as { [key in Locale]: string })[lang]}</h2>
        </div>
      ))}
    </div>
  )
}
