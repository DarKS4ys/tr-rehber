'use client';
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

export default function CarouselComponent({
  images,
}: {
  images: string[] | undefined;
}) {
  const plugin = React.useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current]}
      onMouseEnter={plugin.current.stop} 
      onMouseLeave={plugin.current.reset}
      className="w-[80%] md:w-[95%] p-4 mx-auto"
    >
      <CarouselContent>
        {images?.map((image, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex relative aspect-square items-center justify-center p-6">
                  <Image
                    className="object-cover rounded-lg"
                    src={image}
                    alt={`Place Image ${index}`}
                    fill
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      
      <CarouselNext />
      <CarouselPrevious />
    </Carousel>
  );
}
