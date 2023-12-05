"use client"

import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/toggle-mode'
import LangSwitch from './LangSwitch'
import { Locale } from '@/i18n.config'
import { clsx } from 'clsx';
import UserMenuButton from './Auth/UserMenuButton'
import type { Session } from 'next-auth'
import Link from 'next/link';
import { useRouter } from 'next/navigation'


export default function Navbar({navbar, lang, session}: {navbar: any, lang: Locale, session: Session | null}) {

    const options = navbar.options;

    const [color,setColor] = useState(false)

    const changeColor = () => {
      if (window.scrollY >= 80) {
        setColor(true)
      } else {
        setColor(false)
      }
    }

    useEffect(() => {
      changeColor();
      window.addEventListener('scroll', changeColor);
      return () => {
        window.removeEventListener('scroll', changeColor);
      };
    }, []);
    
  return (
    <div className={clsx('z-50 px-8 flex items-center justify-center sticky top-0 border-b border-border bg-background/90 backdrop-blur-md transition-all duration-300', color ? 'py-2 transition-all' : 'py-4')}>
        <div className='max-w-7xl justify-between items-center flex w-full'>
          <Link href="/" className='text-xl font-medium'>Türkiye Rehberim</Link>

          <div className='flex items-center gap-3'>
            {Object.entries(options).map(([key, value]) => (
              <Link 
              href={key === '/admin/create-place' ? '/create-place' : key}
              key={key}>
                <p className='px-3 py-2 hover:bg-highlighthover hover:scale-110 active:scale-95 hover:text-white rounded-xl transition duration-200 text-neutral-700 dark:text-neutral-300 dark:hover:text-white'>
                  {typeof value === 'string' ? value : null}
                </p>
              </Link>
            ))}
            </div>

            <div className='flex items-center gap-4'>
              <ModeToggle switcher={navbar.switcher}/>
              <LangSwitch lang={lang}/>
              <UserMenuButton session={session ?? session}/>
            </div>
        </div>
    </div>
  )
}
