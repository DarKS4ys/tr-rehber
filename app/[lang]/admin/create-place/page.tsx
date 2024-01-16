import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Locale } from '@/i18n.config';
import PlaceForm from '@/components/PlaceForm';
import { getDictionary } from '@/lib/dictionary';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function AddPlacePage({
  params: { lang }
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);
  
  const { metadataLocal } = await getDictionary(lang)
  metadata.title = metadataLocal.createPlace + ' | Sanal Rehberim'

  if (!session) {
    redirect('/sign-in?callbackUrl=/create-place');
  }

  if (session?.user.status != 'Admin') {
    redirect('/');
  }

  return (
    <div className="flex flex-col gap-4 w-full md:w-[40rem] justify-center items-center p-20 py-[20vh] md:px-2 md:mx-auto">
      <h1 className='text-3xl font-semibold'>Create Place</h1>
        <PlaceForm lang={lang} user={session.user} />
    </div>
  );
}
