'use client';
import React from 'react';
import { BackgroundBeams } from './ui/background-beams';
import ShinyButton from './ShinyButton';
import Image from 'next/image';
import Avatar from '@/public/Avatar.png';
import BorderButton from './ui/border-button';
import Link from 'next/link';
export function BackgroundBeamsDemo({lang}: {lang: string}) {
  return (
    <div className="h-[40rem] mt-12 w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="bg-gradient-to-b from-background to-bg-neutral-950 top-0 w-full dark:h-32 h-8 absolute z-10" />

      <div className=" items-center max-w-2xl flex justify-center text-center flex-col mx-auto p-4 z-40">
        <BorderButton>Yapay Zekâ Destekli</BorderButton>
        <h1 className="mb-8 mt-2 relative z-10 text-3xl md:text-7xl text-white text-center font-sans font-bold">
          Sesli Tur Rehberi
        </h1>
        <Link href={`${lang}/assistant`}>
          <ShinyButton label="Göz at" />
        </Link>
      </div>
      <BackgroundBeams />
      <div className="bg-gradient-to-t from-background to-bg-neutral-950 bottom-0 w-full h-8 dark:h-32 absolute z-10" />
    </div>
  );
}
