import React from 'react';
import GoogleMaps from '@/components/map';
import type { Coordinates } from '@/components/destination';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';
import type { PlanPlace } from '@prisma/client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import ImageGenerate from './image-generate';

export default function PlaceItem({ place }: { place: PlanPlace }) {
  // @ts-ignore
  const googleMapsLink = `https://www.google.com/maps?q=${place.coordinates?.lat},${place.coordinates.lng}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button className="group text-start w-full min-w-[16rem] h-64 flex flex-col bg-background rounded-xl overflow-hidden">
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={place.imageUrl}
              alt="Place Image"
              className="group-hover:scale-110 group-hover:brightness-125 duration-300 transition object-cover"
              fill
            />
          </div>
          <div className="h-24 w-full group-hover:bg-border/15 dark:group-hover:bg-border/40 duration-200 transition bg-background p-3">
            <h1 className="font-semibold">{place.name}</h1>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {place.description}
            </p>
          </div>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-[90%] min-w-[17rem] md:max-w-2xl">
        <div className="h-[23svh] relative min-h-[7rem] rounded-md overflow-hidden w-full">
          <Image
            src={place.imageUrl}
            alt="Place Image"
            className="object-cover"
            fill
          />
        </div>
        <div className="flex flex-col gap-y-0.5">
          <h1 className="font-semibold text-xl">{place.name}</h1>
          <p className="text-sm text-muted-foreground">{place.description}</p>
          <div className='flex mt-2 flex-wrap gap-x-2'>{place.tags && place.tags?.map((tag, i) => (
            <span className='bg-primary/10 px-2 py-0.5 rounded-lg capitalize font-medium' key={i}>
              {tag}
            </span>
          ))}
          </div>
        </div>

        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="google-maps">
            <AccordionTrigger>Bu yerin konumu</AccordionTrigger>
            <AccordionContent>
              <GoogleMaps coordinates={place.coordinates as Coordinates} />
              <Link
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="w-full mt-2 font-medium">
                Google Mapste Aç
                </Button>
              </Link>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="google-images">
            <AccordionTrigger>Bu yer hakkında yeni görseller</AccordionTrigger>
            <AccordionContent>
              <ImageGenerate placeName={place.name}/>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </DialogContent>
    </Dialog>
  );
}