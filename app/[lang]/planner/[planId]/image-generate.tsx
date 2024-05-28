'use client';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import React, { useEffect, useState } from 'react';
import PlaceItem from './place-item';
import axios from 'axios';
import Image from 'next/image';

export default function ImageGenerate({
  placeName,
}: {
  placeName: string | undefined;
}) {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        if (!placeName) {
          return;
        }
        const newImages = await getImageUrls(placeName);
        setImages((prevImages) => [
          ...prevImages,
          ...(newImages.filter((url) => url !== null) as string[]),
        ]);
      } catch (err) {
        console.error('Error fetching images:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [placeName]);
  return (
    <Carousel
      opts={{
        align: 'start',
      }}
      className="w-full"
    >
      <CarouselContent>
        {images.length > 0
          ? images.map((image, i) => (
              <CarouselItem className="sm:basis-1/2" key={i}>
                <div className="relative w-full h-64 rounded-md bg-border/50 overflow-hidden">
                  <Image
                    className="object-contain"
                    src={image}
                    fill
                    alt={`Image ${i}`}
                  />
                </div>
              </CarouselItem>
            ))
          : Array.from({ length: 3 }).map((_, i) => (
              <CarouselItem className="sm:basis-1/2" key={i}>
                <div className="w-full h-64 bg-border rounded-md animate-pulse"></div>
              </CarouselItem>
            ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

async function getImageUrls(placeName: string): Promise<string[]> {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_API_KEY;
  const cx = process.env.NEXT_PUBLIC_GOOGLE_CUSTOM_SEARCH_CX;
  const url = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
    `Trabzon ${placeName}`
  )}&cx=${cx}&searchType=image&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const { items } = response.data;
    if (items && items.length > 0) {
      return items.slice(0, 3).map((item: { link: string }) => item.link);
    }
  } catch (error) {
    console.error('Error fetching image URLs:', error);
  }

  return [];
}
