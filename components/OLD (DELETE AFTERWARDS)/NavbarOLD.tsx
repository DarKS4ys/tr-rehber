"use client"

import { ModeToggle } from './ui/toggle-mode'
import LangSwitch from './LangSwitch'
import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import MobileSheet from './MobileSheet'

export default function Nav({navbar, lang}: {navbar: any, lang:string}) {
  const pathname = usePathname();
  const options = navbar.options;
  const pathnameWithoutLanguage = pathname.replace(/^\/[a-z]{2}\//, '');

  return (
    <header className='w-full sticky top-0 backdrop-blur-md bg-white/70 dark:bg-background/80 dark:bg-opacity-10 dark:shadow-none shadow-lg dark:border-border dark:border-b z-50'>
      <div className='md:max-w-[1200px] mx-auto'>
        <ul className='flex items-center justify-between px-8 py-4'>
            <Link href={`/${lang}`} className='hidden md:flex text-2xl font-semibold tracking-wide text-highlight'>
              TRABZON REHBERİM
            </Link>
          <li className='md:hidden flex'>
            <MobileSheet navbar={navbar} lang={lang} pathnameWithoutLanguage={pathnameWithoutLanguage}/>
          </li>
          <li className="md:flex gap-4 hidden">
          {Object.entries(options).map(([key, value]) => (
              <Link 
              href={pathnameWithoutLanguage === key ? `/${lang}` : key === 'contact' ? `/${lang}/#${key}` : `/${lang}/${key}`}
              key={key}>
                <p className='px-3 py-2 hover:bg-highlighthover hover:scale-110 active:scale-95 hover:text-white rounded-xl transition duration-200 text-neutral-700 dark:text-neutral-300 dark:hover:text-white'>
                  {typeof value === 'string' ? value : null}
                </p>
              </Link>
            ))}
          </li>
          <li className='flex gap-4 items-center justify-end'>
            <ModeToggle navbar={navbar}/>
            <LangSwitch navbar={navbar}/>
          </li>
        </ul>
      </div>
    </header>
  )
}
