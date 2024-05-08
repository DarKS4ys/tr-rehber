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
    <div className="py-10 px-4 md:p-12">
        Planner
    </div>
  )
}
