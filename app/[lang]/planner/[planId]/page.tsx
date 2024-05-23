import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { Toaster } from 'sonner';
import Search from './search';

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function page({
  params: { lang, planId },
}: {
  params: { planId: string; lang: Locale };
}) {
  const plan = await prisma.travelPlan.findFirst({
    where: { id: planId },
    include: { user: true, PlanPlace: true },
  });

  return (
    <div className="max-w-7xl h-[85svh] mx-auto py-4 flex flex-col gap-y-4">
      <div className="flex gap-x-3 justify-between">
        <button className="font-semibold w-fit rounded-lg text-lg py-1 px-2 hover:bg-primary/20 transition text-start">
          {plan?.name}
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-medium">Ekle</Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <Search/>
          </DialogContent>
        </Dialog>
      </div>
      <div className="p-6 bg-primary/10 rounded-lg flex flex-col gap-y-2">
        <h1 className="text-lg font-medium">Gidilecek yerler</h1>
        {plan?.PlanPlace.map((place, i) => (
          <div key={i}>{place.name}</div>
        ))}
      </div>
      <Toaster closeButton richColors />
    </div>
  );
}
