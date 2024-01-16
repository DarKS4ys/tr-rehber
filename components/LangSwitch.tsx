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
  en: { en: 'English', tr: 'Turkish', es: 'Spanish', fr: 'French', de: 'German', it: 'Italian', pt: 'Portuguese', ru: 'Russian', zh: 'Chinese', ja: 'Japanese', ar: 'Arabic', ko: 'Korean', hi: 'Hindi', fa: 'Persian', nl: 'Dutch', sv: 'Swedish', no: 'Norwegian', da: 'Danish', fi: 'Finnish', el: 'Greek' },
  tr: { en: 'İngilizce', tr: 'Türkçe', es: 'İspanyolca', fr: 'Fransızca', de: 'Almanca', it: 'İtalyanca', pt: 'Portekizce', ru: 'Rusça', zh: 'Çince', ja: 'Japonca', ar: 'Arapça', ko: 'Korece', hi: 'Hintçe', fa: 'Farsça', nl: 'Hollandaca', sv: 'İsveççe', no: 'Norveçce', da: 'Danca', fi: 'Fince', el: 'Yunanca' },
  es: { en: 'Spanish', tr: 'Español', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  fr: { en: 'French', tr: 'Français', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  de: { en: 'German', tr: 'Deutsch', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  it: { en: 'Italian', tr: 'Italiano', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  pt: { en: 'Portuguese', tr: 'Português', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  ru: { en: 'Russian', tr: 'Русский', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  zh: { en: 'Chinese', tr: '中文', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  ja: { en: 'Japanese', tr: '日本語', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  ar: { en: 'Arabic', tr: 'العربية', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  ko: { en: 'Korean', tr: '한국어', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  hi: { en: 'Hindi', tr: 'हिन्दी', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  fa: { en: 'Persian', tr: 'فارسی', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  nl: { en: 'Dutch', tr: 'Nederlands', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  sv: { en: 'Swedish', tr: 'Svenska', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  no: { en: 'Norwegian', tr: 'Norsk', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  da: { en: 'Danish', tr: 'Dansk', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  fi: { en: 'Finnish', tr: 'Suomi', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
  el: { en: 'Greek', tr: 'Ελληνικά', es: 'Español', fr: 'Français', de: 'Deutsch', it: 'Italiano', pt: 'Português', ru: 'Russian', zh: '中文', ja: '日本語', ar: 'العربية', ko: '한국어', hi: 'हिन्दी', fa: 'فارسی', nl: 'Nederlands', sv: 'Svenska', no: 'Norsk', da: 'Dansk', fi: 'Suomi', el: 'Ελληνικά' },
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
