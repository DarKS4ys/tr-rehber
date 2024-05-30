"use client"

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { i18n, Locale } from '@/i18n.config';
import { FaCheck } from 'react-icons/fa';
import {BsChevronDown} from 'react-icons/bs'
import { clsx } from 'clsx';
import { getLocalLanguageName } from '@/lib/utils';

export default function LangSwitch({ lang }: { lang: Locale }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter()

  const handleLanguageChange = (newLang: any) => {
    const isHomepage = /^(\/[a-z]{2})?$/.test(pathname);

    if (isHomepage) {
      router.push(`/${newLang}`);
    } else {
      router.push(pathname.replace(/\/[a-z]{2}\//, `/${newLang}/`));
    }
  };

  return (
    <DropdownMenu onOpenChange={() => setDropdownOpen(!dropdownOpen)}>
      <DropdownMenuTrigger asChild>
        <Button className='bg-highlight hover:bg-highlighthover duration-200 flex gap-2 group'>
          {lang &&
          <>
            <p className="font-medium">{getLocalLanguageName(lang, lang)}</p>
            <BsChevronDown className={clsx('group-hover:rotate-45 transition duration-200', dropdownOpen ? 'rotate-0' : 'rotate-180')}/>
          </>
          }
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid grid-cols-2 2xl:grid-cols-1">
        {i18n.locales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => handleLanguageChange(locale)}>
            <p className='flex gap-2 items-center'>{getLocalLanguageName(locale, lang)} {lang === locale && <FaCheck />}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
