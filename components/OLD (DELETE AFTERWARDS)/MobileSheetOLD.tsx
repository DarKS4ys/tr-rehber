import { Menu } from 'lucide-react'
import React from 'react'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet'
import { Button } from './ui/button'
import Link from 'next/link'
import ShinyButton from './ShinyButton'

export default function MobileSheet({ navbar, lang, pathnameWithoutLanguage }: { navbar: any, lang: string, pathnameWithoutLanguage: string }) {
  const options = navbar.options;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary hover:text-black"
        >
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="top" className="p-0">
        <div className="flex flex-col text-primary justify-center items-center m-8 tracking-widest text-lg">
          {Object.keys(options).map((key) => (
            <Link href={pathnameWithoutLanguage === key ? `/${lang}` : `/${lang}/${key}`} key={options[key]}>
              <p className="px-4 m-1 py-2 hover:bg-accent/70 hover:scale-110 rounded-lg transition duration-300">
                {options[key]}
              </p>
            </Link>
          ))}
          <div className="mt-2">
            <ShinyButton label={options.explore} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}