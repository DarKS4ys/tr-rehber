"use client"

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { i18n, Locale } from '@/i18n.config';
import { FaCheck } from 'react-icons/fa';
import {BsChevronDown} from 'react-icons/bs'
import { clsx } from 'clsx';

const languageNames: Record<Locale, { [key in Locale]: string }> = {
  en: { en: 'English', tr: 'Turkish' },
  tr: { en: 'İngilizce', tr: 'Türkçe' },
};

export default function LangSwitch({ lang }: { lang: Locale }) {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const pathname = usePathname();
  const router = useRouter()

  const handleLanguageChange = (newLang: Locale) => {
    const isHomepage = /^(\/[a-z]{2})?$/.test(pathname);

    if (isHomepage) {
      router.push(`/${newLang}`);
    } else {
      router.push(pathname.replace(/\/[a-z]{2}\//, `/${newLang}/`));
    }
  };

  return (
    <DropdownMenu onOpenChange={(isOpen) => setDropdownOpen(!dropdownOpen)}>
      <DropdownMenuTrigger asChild>
        <Button className='bg-highlight hover:bg-highlighthover duration-200 flex gap-2 group'>
          {lang &&
          <>
            <p>{languageNames[lang][lang]}</p>
            <BsChevronDown className={clsx('group-hover:rotate-45 transition duration-200', dropdownOpen ? 'rotate-0' : 'rotate-180')}/>
          </>
          }
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

      {i18n.locales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => handleLanguageChange(locale)}>
            <p className='flex gap-2 items-center'>{languageNames[lang][locale]} {lang === locale && <FaCheck/>}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
