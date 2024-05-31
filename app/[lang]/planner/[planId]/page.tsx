import { Button } from '@/components/ui/button';
import { Locale } from '@/i18n.config';
import { prisma } from '@/lib/db/prisma';
import type { Metadata } from 'next';
import Image from 'next/image';
import React from 'react';
import { Toaster } from 'sonner';
import PlaceItem from './place-item';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import PlanRenameButton from './plan-rename-button';
import SearchButton from './searchbtn';
import ShareButton from './sharebtn';
import PlaceAddButton from './place-addbtn';
import FoodAddButton from './food-addbtn';
import FoodItem from './food-item';
import HotelAddButton from './hotel-addbtn';

export const metadata: Metadata = {
  title: 'Sanal Rehberim',
  description: 'Yapay zeka entegreli sanal rehber uygulaması.',
};

export default async function page({
  params: { lang, planId },
  searchParams: { modal, input },
}: {
  params: { planId: string; lang: Locale };
  searchParams: { modal: string; input: string };
}) {
  const plan = await prisma.travelPlan.findFirst({
    where: { id: planId },
    include: { user: true, PlanPlace: true, PlanEdible: true },
  });

  return (
    <div className="max-w-7xl mx-auto pt-4 pb-8 flex flex-col gap-y-4 px-8">
      <div className="flex gap-x-3 justify-between">
        <PlanRenameButton planId={plan?.id} planName={plan?.name} />
        <div className="flex gap-x-2">
          <SearchButton
            input={input}
            modal={modal}
            planId={plan?.id}
            lang={lang}
          />
          <ShareButton domain={process.env.NEXTAUTH_URL} />
        </div>
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

              <CarouselItem className="sm:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                <PlaceAddButton />
              </CarouselItem>
            </CarouselContent>
            {plan?.PlanPlace && plan?.PlanPlace.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
      </div>
      <div className="flex gap-x-4">
        <div className="px-6 pt-3 pb-5 w-3/4 bg-primary/10 rounded-lg flex flex-col gap-y-2">
          <h1 className="text-lg font-medium">Yöresel yemekler</h1>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
              {plan?.PlanEdible.map((edible, i) => (
                <CarouselItem
                  className="sm:basis-1/2"
                  key={i}
                >
                  <FoodItem edible={edible} />
                </CarouselItem>
              ))}

              <CarouselItem className="sm:basis-1/2">
                <FoodAddButton />
              </CarouselItem>
            </CarouselContent>
            {plan?.PlanEdible && plan?.PlanEdible.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )}
          </Carousel>
        </div>
        <div className="px-6 pt-3 pb-5 w-1/4 bg-primary/10 rounded-lg flex flex-col gap-y-2">
          <h1 className="text-lg font-medium">Kalınacak oteller</h1>
          <Carousel
            opts={{
              align: 'start',
            }}
            className="w-full"
          >
            <CarouselContent>
{/*               {plan?.PlanEdible.map((edible, i) => (
                <CarouselItem
                  className="sm:basis-1/2"
                  key={i}
                >
                  <FoodItem edible={edible} />
                </CarouselItem>
              ))} */}

              <CarouselItem className="sm:basis-1/2">
                <HotelAddButton />
              </CarouselItem>
            </CarouselContent>
{/*             {plan?.PlanEdible && plan?.PlanEdible.length > 1 && (
              <>
                <CarouselPrevious />
                <CarouselNext />
              </>
            )} */}
          </Carousel>
        </div>
      </div>
      <Toaster closeButton richColors />
    </div>
  );
}
