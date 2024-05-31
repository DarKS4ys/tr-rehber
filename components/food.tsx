'use client';
import { Destination, Edible } from '@/schemas/ai';
import React, { useState, useTransition } from 'react';
import GoogleMaps from './map';
import { Button } from './ui/button';
import Image from 'next/image';
import { serverCreateTravelEdible, serverCreateTravelPlace } from '@/actions/planner';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';
import foodPlaceholder from '@/public/food.svg'

export type Coordinates = {
  lat: number;
  lng: number;
};

export default function Food({
  edible,
  image,
  planId,
}: {
  edible: Edible;
  image: string | null;
  planId: string;
}) {
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname();

  const handleClick = () => {
    startTransition(async () => {
      if (!edible.name || !edible.description || !edible.tags || !image || !edible.origin) {
        return;
      }
      const validTags = edible.tags.filter(
        (tag): tag is string => tag !== undefined
      );

      await serverCreateTravelEdible(
        planId,
        edible.name,
        edible.description,
        pathname,
        image,
        edible.origin,
        validTags
      );
      toast.success('Başarıyla yeni yiyecek eklendi.');
    });
  };
  return (
    <div className="p-8 flex flex-col gap-4 justify-between bg-primary/10 rounded-xl">
      <div className="flex justify-between flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-bold">{edible.name}</h1>
          <p className="text-sm text-muted-foreground max-h-16 overflow-y-scroll">
            {edible.description}
          </p>
          <p>Köken: {edible.origin}</p>

          <div className="flex flex-wrap gap-x-2">
            {edible.tags?.map((tag, i) => (
              <span
                className="bg-primary/10 px-2 py-0.5 rounded-lg capitalize font-medium"
                key={i}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <Image
        alt="Edible Image"
        src={image || foodPlaceholder}
        width={512}
        height={512}
        quality={95}
        className="max-h-[18rem] h-[22svh] min-h-[9rem] object-cover rounded-lg"
      />
      <div className="w-full flex flex-col gap-y-2">
        <Button
          disabled={isPending}
          onClick={handleClick}
          className="font-semibold"
        >
          Seyehat Planına Ekle
        </Button>
{/*         <div className="w-full flex sm:flex-row flex-col gap-y-1 gap-x-2">
          <Button
            onClick={() => setMapView(!mapView)}
            variant="outline"
            className="font-semibold w-full"
          >
            Konumu Görüntüle
          </Button>
          <Button variant="outline" className="font-semibold w-full">
            Konaklama Seçenekleri
          </Button>
        </div> */}
      </div>
    </div>
  );
}
