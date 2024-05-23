import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import React from 'react';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Intro from './intro';
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

  const dbUser = await prisma.user.findFirst({
    where: {id: session?.user.id},
    include: {TravelPlan: true}
  })


  return (
    <div className="py-10 h-[80svh] md:p-12 mx-auto max-w-7xl">
      <Intro user={session?.user} dbUser={dbUser}/>
      {/* <Planner /> */}
      <Toaster closeButton richColors />
    </div>
  );
}
