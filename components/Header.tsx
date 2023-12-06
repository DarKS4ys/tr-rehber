"use client"

import { Locale } from '@/i18n.config';
import Image from 'next/image';
import React from 'react';
import Input from './Input';
import { IoMdSend } from 'react-icons/io';
import clsx from 'clsx';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import Link from 'next/link';
import type { NextFont } from 'next/dist/compiled/@next/font';
import { PlaceSnippet } from '@prisma/client';
import { Progress } from './ui/progress';


export default function Header({ allPlaces, lang, aleo }: { allPlaces: PlaceSnippet[], lang: Locale, aleo: NextFont }) {
    const [currentPlaceIndex, setCurrentPlaceIndex] = React.useState(0);
  
    const randomPlace = allPlaces[currentPlaceIndex];
    const randomImage = randomPlace.images[Math.floor(Math.random() * randomPlace.images.length)];
  
    const handleNextPlace = () => {
      setCurrentPlaceIndex((prevIndex) => (prevIndex + 1) % allPlaces.length);
    };
  
    const handlePrevPlace = () => {
      setCurrentPlaceIndex((prevIndex) => (prevIndex - 1 + allPlaces.length) % allPlaces.length);
    };
  
    const handleButtonClick = (index: number) => {
      setCurrentPlaceIndex(index);
    };

  return (
    <div className="w-full relative h-[100dvh] flex items-center">
      <div className="w-full h-full bg-black absolute top-0 left-0 z-10 opacity-40" />
      <Image alt="Place Image Cover" className="object-cover" priority quality={95} fill src={randomPlace?.imageUrl!} />

      <div className="py-10 px-4 md:p-12 w-full z-10">
        <div className="max-w-7xl mx-auto relative w-full text-white flex">
          <div className="mt-10 flex flex-col gap-12 w-full"> {/* !!! MT10 !!! */}
            <div className="flex flex-col md:flex-row gap-8 justify-between items-center w-full">
              <div className="flex flex-wrap flex-col gap-3">
                <h4>travel, learn, share. everything okay with us.</h4>
                <h1 className="text-2xl 2xl:text-3xl font-medium">The smart way to travel consciously</h1>
                <div className="relative mt-4 flex items-center">
                  <Input
                    placeholder="Chat with AI"
                    className="bg-white/60 focus:bg-white/10 backdrop-blur border-white/80 ring-[#4D6795] ring-offset-white focus:placeholder:text-slate-300 placeholder:text-primary/50 transition duration-200"
                  />
                  <IoMdSend size={24} className="absolute right-4 cursor-pointer drop-shadow-lg hover:opacity-70 transition duration-200" />
                </div>
              </div>
              <div className={aleo.className}>
                <h1 className="text-7xl">{(randomPlace?.name as { [key in Locale]: string })[lang]}</h1>
              </div>
            </div>

            <div className='flex flex-col gap-4 w-full overflow-hidden'>
                <div className='flex gap-2 justify-end w-2/6 ml-auto'>
                    <Progress value={0}/>
                    <button className="hover:-translate-x-1 transition" onClick={handlePrevPlace}>
                        <FaChevronLeft />
                    </button>

                    <button className="hover:translate-x-1 transition" onClick={handleNextPlace}>
                        <FaChevronRight />
                    </button>
                    

                </div>
                <div className="flex gap-4">
                {allPlaces && allPlaces?.map((place, placeIndex) => {
                    const isRandomPlace = currentPlaceIndex === placeIndex;
                    const placeImage = place.images[Math.floor(Math.random() * place.images.length)];

                    return (
                    <div key={placeIndex} className={clsx('flex gap-4', { 'order-first': isRandomPlace })}>
                        <button 
                        className={clsx('shadow-xl hover:scale-y-105 relative w-64 aspect-square rounded-lg overflow-hidden border border-border group transition duration-200', {
                            'h-80': isRandomPlace,
                            'h-64 aspect-square': !isRandomPlace,
                        })}

                        onClick={() => handleButtonClick(placeIndex)}
                        >
                            <div className='bg-black/30 w-full h-full z-20 absolute top-0 opacity-0 group-hover:opacity-100 transition duration-200'/>
                            <Image alt="Image" src={isRandomPlace ? randomImage : placeImage} fill className="object-cover" />
                        </button>
                    </div>
                    );
                })}
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
