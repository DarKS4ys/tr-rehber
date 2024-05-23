'use client';
import { Destination } from '@/schemas/ai';
import React, { useState, useTransition } from 'react';
import GoogleMaps from './map';
import { Button } from './ui/button';
import Image from 'next/image';
import { serverCreateTravelPlace } from '@/actions/planner';
import { toast } from 'sonner';

export type Coordinates = {
  lat: number;
  lng: number;
};

export default function Destination({
  destination,
  coordinates,
  image,
}: {
  destination: Destination;
  coordinates: Coordinates | null;
  image: string | null;
}) {
  const [mapView, setMapView] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleClick = () => {
      startTransition(async () => {
        /* await serverCreateTravelPlace(destination.id, pathname); */
        toast.success('Başarıyla yeni seyehat planı oluşturuldu.');

      });
  };
  return (
    <div className="p-8 flex flex-col gap-4 justify-between bg-primary/10 rounded-xl">
      <div className="flex justify-between flex-col gap-y-2">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-3xl font-semibold">{destination.name}</h1>
          <p className="text-sm text-muted-foreground max-h-16 overflow-y-scroll">
            {destination.description}
          </p>
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
            className=" object-cover rounded-lg"
          />
        )
      )}

      <div className="w-full flex flex-col gap-y-2">
        <Button onClick={handleClick} className="font-semibold">Seyehat Planına Ekle</Button>
        <div className="w-full flex gap-x-2">
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
