"use client"

import React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { i18n, Locale } from '@/i18n.config';

const languageNames: Record<Locale, { [key in Locale]: string }> = {
  en: { en: 'English', tr: 'Turkish' },
  tr: { en: 'İngilizce', tr: 'Türkçe' },
};

export default function LangSwitch({ lang }: { lang: Locale }) {
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='bg-highlight hover:bg-highlighthover duration-200'>
          {lang && <p>{languageNames[lang][lang]}</p>}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>

      {i18n.locales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => handleLanguageChange(locale)}>
            <p>{languageNames[lang][locale]} {lang === locale && <span>✅</span>}</p>
          </DropdownMenuItem>
        ))}

      </DropdownMenuContent>
    </DropdownMenu>
  );
}
