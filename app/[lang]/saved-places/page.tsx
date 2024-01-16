import PlaceCard from '@/components/PlaceCard';
import type { Locale } from '@/i18n.config';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/db/prisma';
import { getDictionary } from '@/lib/dictionary';
import type { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import React from 'react';
import { Toaster } from 'sonner';

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/sign-in?callbackUrl=/saved-places');
  }

  const { metadataLocal } = await getDictionary(lang);
  const { savedPlacesLocal } = await getDictionary(lang);

  metadata.title = metadataLocal.savedPlaces + ' | Sanal Rehberim';

  const savedPlaces = await prisma.savedPlace.findMany({
    where: { userId: session.user.id },
    include: {
      place: true,
    },
  });

  return (
    <div className="py-10 px-4 md:p-12">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-semibold">{savedPlacesLocal.title}</h1>
          <p className="text-muted-foreground font-light">
            {savedPlacesLocal.description}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {savedPlaces.map(({ place, createdAt, id }) => ( // DESTRUCTURE PLACE FROM SAVED PLACE !
            <PlaceCard savedPlaceId={id} createdAt={createdAt} savedMode savePlaceLocal={savedPlacesLocal} key={id} place={place} user={session?.user} lang={lang}/>
          ))}
        </div>
      </div>
      <Toaster/>
    </div>
  );
}
