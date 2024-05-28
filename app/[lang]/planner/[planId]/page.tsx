import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { Toaster } from 'sonner';
import Search from './search';
import PlaceItem from './place-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PlanRenameButton from './plan-rename-button';
import { BsPlus } from 'react-icons/bs';
import { AiOutlineSearch } from 'react-icons/ai';

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
    <div className="max-w-7xl mx-auto pt-4 pb-8 flex flex-col gap-y-4 px-8">
      <div className="flex gap-x-3 justify-between">
        <PlanRenameButton planId={plan?.id} planName={plan?.name}/>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-medium gap-x-1"><AiOutlineSearch/> Ekle</Button>
          </DialogTrigger>
          <DialogContent className="w-[90%] max-w-xl">
            <Search planId={planId} lang={lang} />
          </DialogContent>
        </Dialog>
      </div>
      <div className="px-6 pt-3 pb-5 bg-primary/10 rounded-lg flex flex-col gap-y-2">
        <h1 className="text-lg font-medium">Görülecek yerler</h1>
        <div className="w-full flex gap-x-4">
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {plan?.PlanPlace.map((place, i) => (
                <CarouselItem
                  className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4"
                  key={i}
                >
                  <PlaceItem place={place} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="px-6 pt-3 pb-5 w-full bg-primary/10 rounded-lg flex flex-col gap-y-2">
          <h1 className="text-lg font-medium">Yöresel yemekler</h1>
        </div>
        <div className="px-6 pt-3 pb-5 w-full bg-primary/10 rounded-lg flex flex-col gap-y-2">
          <h1 className="text-lg font-medium">Kalınacak oteller</h1>
        </div>
      </div>
      <Toaster closeButton richColors />
    </div>
  );
}
