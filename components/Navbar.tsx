"use client"

import React, { useEffect, useState } from 'react'
import { ModeToggle } from './ui/toggle-mode'
import LangSwitch from './LangSwitch'
import { Locale } from '@/i18n.config'
import { clsx } from 'clsx';
import UserMenuButton from './Auth/UserMenuButton'
import type { Session } from 'next-auth'
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation'
import MobileSheet from './MobileSheet'


export default function Navbar({navbar, lang, session}: {navbar: any, lang: Locale, session: Session | null}) {

  const pathname = usePathname();
  const pathnameWithoutLanguage = pathname.replace(/^\/[a-z]{2}\//, '');

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
          <Link href={`/${lang}`} className='text-xl font-medium md:block hidden'>Sanal Rehberim</Link>

          <li className='md:hidden flex'>
            <MobileSheet navbar={navbar} lang={lang} pathnameWithoutLanguage={pathnameWithoutLanguage}/>
          </li>

          <div className='hidden md:flex items-center gap-3'>
            {Object.entries(options).map(([key, value]) => (
              <Link 
              href={pathnameWithoutLanguage === key ? `/${lang}` : key === 'contact' ? `/${lang}/#${key}` : `/${lang}/${key}`}
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
              <UserMenuButton userMenu={navbar.userMenu} session={session ?? session}/>
            </div>
        </div>
    </div>
  )
}
