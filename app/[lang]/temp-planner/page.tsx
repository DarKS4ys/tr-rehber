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

  metadata.title = metadataLocal.explore + ' | Sanal Rehberim'

  return (
    <div className="py-8 flex items-center justify-center max-w-7xl mx-auto">
        <h1 className='text-4xl font-bold text-center'>Yapay Zeka <br/> Seyehat Planlayıcı</h1>
        
      <Toaster/>
    </div>
  )
}
