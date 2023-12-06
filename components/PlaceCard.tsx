import { Locale } from '@/i18n.config';
import { Place } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

export default function PlaceCard({
  place,
  lang,
}: {
  place: Place;
  lang: Locale;
}) {
  return (
    <Link
      href={`explore/${place.id}`}
      className="group relative bg-gray-100 dark:bg-transparent flex flex-col gap-4 h-[32rem] items-center text-center border border-border hover:border-primary/80 rounded-xl transition duration-200 overflow-hidden"
    >
        {place.images ? (
          <div key={place.id} className='absolute px-4 left-0 top-8 gap-8 opacity-0 group-hover:opacity-100 group-hover:flex -rotate-45 -translate-x-40 group-hover:rotate-0 group-hover:scale-100 scale-50 group-hover:translate-x-0 transition duration-300'>
            <Image
            loading="lazy"
            alt="image"
            src={place.images[0]}
            width={400}
            height={200}
            className="w-full h-[12.4rem] object-cover aspect-square rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-[15.4rem] bg-primary/20 animate-pulse" />
        )}

        {place.images ? (
          <div key={place.id} className='absolute px-4 right-0 top-8 gap-8 opacity-0 group-hover:opacity-100 group-hover:flex rotate-45 translate-x-40 group-hover:rotate-0 group-hover:scale-100 scale-50 group-hover:translate-x-0 transition duration-300'>
            <Image
            loading="lazy"
            alt="image"
            src={place.images[1]}
            width={400}
            height={200}
            className="w-full h-[12.4rem] object-cover aspect-square rounded-lg"
            />
          </div>
        ) : (
          <div className="w-full h-[15.4rem] bg-primary/20 animate-pulse" />
        )}

      <div className="relative group-hover:scale-110 transition duration-200">
        <div className="absolute top-44 left-0 w-full h-20 bg-gradient-to-b from-transparent via-transparent to-gray-100 dark:to-background" />

        {place.imageUrl ? (
          <Image
            loading="lazy"
            alt="image"
            src={place.imageUrl}
            width={400}
            height={200}
            className="w-full h-[15.4rem] object-cover aspect-square rounded-b-lg"
          />
        ) : (
          <div className="w-full h-[15.4rem] bg-primary/20 animate-pulse" />
        )}

      </div>
      <div className="px-4 pt-2 pb-4 gap-4 flex flex-col relative z-10">
        <h1 className="text-3xl font-medium">
          {(place.name as { [key in Locale]: string })[lang]}
        </h1>
        <h2 className="font-light text-sm">
          {(place.description as { [key in Locale]: string })[lang]}
        </h2>
        <ul className="flex flex-wrap gap-2 justify-center">
          {(place.tags as { [key: string]: string[] }[])
            .find((tagObject) => tagObject[lang])
            ?.[lang].map((tag, index) => (
              <li
                key={index}
                className="bg-primary/10 px-4 py-2 rounded-lg text-xs hover:bg-primary/20 transition duration-200"
              >
                {tag}
              </li>
            ))}
        </ul>
        <div className="w-64 h-10 bg-primary rounded-full opacity-0 group-hover:opacity-100 mt-4 dark:blur-[110px] blur-[100px] mx-auto transition duration-500" />
      </div>
    </Link>
  );
}
