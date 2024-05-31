"use client"

import Image from 'next/image';
import React from 'react';
import { AiFillPlusCircle } from 'react-icons/ai';
import FoodPlaceholder from '@/public/food.svg'
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function FoodAddButton() {
    const pathname = usePathname()
  return (
    <Link href={encodeURI(`${pathname}?modal=true&input=Bana geleneksel bir yemek öner.`)} className="group text-start w-full min-w-[16rem] h-64 flex flex-col bg-background rounded-xl overflow-hidden">
      <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
        <AiFillPlusCircle size={64} className="z-10" />
        <Image
          src={FoodPlaceholder}
          alt="Food Placeholder"
          className="opacity-20 absolute inset-0 w-full"
        />
      </div>
      <div className="h-24 w-full group-hover:bg-border/15 dark:group-hover:bg-border/40 duration-200 transition bg-background p-3">
        <h1 className="font-semibold">Yeni Ekle</h1>
        <p className="text-sm text-muted-foreground line-clamp-2">
          Yeni bir yemek ekle!
        </p>
      </div>
    </Link>
  );
}
