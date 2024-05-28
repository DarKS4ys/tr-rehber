'use client';
import { Destination } from '@/schemas/ai';
import React, { useState, useTransition } from 'react';
import GoogleMaps from './map';
import { Button } from './ui/button';
import Image from 'next/image';
import { serverCreateTravelPlace } from '@/actions/planner';
import { toast } from 'sonner';
import { usePathname } from 'next/navigation';

export type Coordinates = {
  lat: number;
  lng: number;
};

export default function Destination({
  destination,
  coordinates,
  image,
  planId
}: {
  destination: Destination;
  coordinates: Coordinates | null;
  image: string | null;
  planId: string
}) {
  const [mapView, setMapView] = useState(false);
  const [isPending, startTransition] = useTransition();

  const pathname = usePathname()

  const handleClick = () => {
      startTransition(async () => {
        if (!destination.name || !destination.description || !destination.tags || !image || !coordinates) {
          return
        }
        const validTags = destination.tags.filter((tag): tag is string => tag !== undefined);

        await serverCreateTravelPlace(planId, destination.name, destination.description, pathname, image, coordinates, validTags);
        toast.success('Başarıyla yeni gidilecek yer eklendi.');
      });
  };
  return (
    <div className="p-8 flex flex-col gap-4 justify-between bg-primary/10 rounded-xl">
      <div className="flex justify-between flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-bold">{destination.name}</h1>
          <p className="text-sm text-muted-foreground max-h-16 overflow-y-scroll">
            {destination.description}
          </p>

          <div className='flex flex-wrap gap-x-2'>{destination.tags?.map((tag, i) => (
            <span className='bg-primary/10 px-2 py-0.5 rounded-lg capitalize font-medium' key={i}>
              {tag}
            </span>
          ))}
          </div>
        </div>
      </div>
      {mapView ? (
        <GoogleMaps coordinates={coordinates} />
      ) : (
        image && (
          <Image
            alt="Place Image"
            src={image}
            width={512}
            height={512}
            quality={95}
            className="max-h-[18rem] h-[22svh] min-h-[9rem] object-cover rounded-lg"
          />
        )
      )}

      <div className="w-full flex flex-col gap-y-2">
        <Button disabled={isPending} onClick={handleClick} className="font-semibold">Seyehat Planına Ekle</Button>
        <div className="w-full flex sm:flex-row flex-col gap-y-1 gap-x-2">
          <Button onClick={() => setMapView(!mapView)} variant="outline" className="font-semibold w-full">
            Konumu Görüntüle
          </Button>
          <Button variant="outline" className="font-semibold w-full">
            Konaklama Seçenekleri
          </Button>
        </div>
      </div>
    </div>
  );
}
