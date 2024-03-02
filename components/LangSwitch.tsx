"use client"

import React, { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import { i18n, Locale } from '@/i18n.config';
import { FaCheck } from 'react-icons/fa';
import {BsChevronDown} from 'react-icons/bs'
import { clsx } from 'clsx';

const languageNames: any = {
  en: { "en": "English", "tr": "Turkish", "es": "Spanish", "fr": "French", "de": "German", "it": "Italian", "pt": "Portuguese", "ru": "Russian", "zh": "Chinese", "ja": "Japanese", "ar": "Arabic", "ko": "Korean", "hi": "Hindi", "fa": "Persian", "nl": "Dutch", "sv": "Swedish", "no": "Norwegian", "da": "Danish", "fi": "Finnish", "el": "Greek" },
  tr: { "en": "İngilizce", "tr": "Türkçe", "es": "İspanyolca", "fr": "Fransızca", "de": "Almanca", "it": "İtalyanca", "pt": "Portekizce", "ru": "Rusça", "zh": "Çince", "ja": "Japonca", "ar": "Arapça", "ko": "Korece", "hi": "Hintçe", "fa": "Farsça", "nl": "Hollandaca", "sv": "İsveççe", "no": "Norveççe", "da": "Danca", "fi": "Fince", "el": "Yunanca" },
  es: { "en": "Inglés", "tr": "Turco", "es": "Español", "fr": "Francés", "de": "Alemán", "it": "Italiano", "pt": "Portugués", "ru": "Ruso", "zh": "Chino", "ja": "Japonés", "ar": "Árabe", "ko": "Coreano", "hi": "Hindi", "fa": "Persa", "nl": "Holandés", "sv": "Sueco", "no": "Noruego", "da": "Danés", "fi": "Finlandés", "el": "Griego" },
  fr: { "en": "Anglais", "tr": "Turque", "es": "Español", "fr": "Francés", "de": "Alemán", "it": "Italiano", "pt": "Portugués", "ru": "Ruso", "zh": "Chino", "ja": "Japonés", "ar": "Árabe", "ko": "Coreano", "hi": "Hindi", "fa": "Persa", "nl": "Holandés", "sv": "Sueco", "no": "Noruego", "da": "Danés", "fi": "Finlandés", "el": "Griego" },
  de: { "en": "Englisch", "tr": "Türkisch", "es": "Español", "fr": "Francés", "de": "Alemán", "it": "Italiano", "pt": "Portugués", "ru": "Ruso", "zh": "Chino", "ja": "Japonés", "ar": "Árabe", "ko": "Coreano", "hi": "Hindi", "fa": "Persa", "nl": "Holandés", "sv": "Sueco", "no": "Noruego", "da": "Danés", "fi": "Finlandés", "el": "Griego" },
  it: { "en": "Inglese", "tr": "Turco", "es": "Español", "fr": "Francés", "de": "Alemán", "it": "Italiano", "pt": "Portugués", "ru": "Ruso", "zh": "Chino", "ja": "Japonés", "ar": "Árabe", "ko": "Coreano", "hi": "Hindi", "fa": "Persa", "nl": "Holandés", "sv": "Sueco", "no": "Noruego", "da": "Danés", "fi": "Finlandés", "el": "Griego" },
  pt: { "en": "Inglês", "tr": "Turco", "es": "Espanhol", "fr": "Francês", "de": "Alemão", "it": "Italiano", "pt": "Português", "ru": "Russo", "zh": "Chinês", "ja": "Japonês", "ar": "Árabe", "ko": "Coreano", "hi": "Hindi", "fa": "Persa", "nl": "Holandês", "sv": "Sueco", "no": "Norueguês", "da": "Dinamarquês", "fi": "Finlandês", "el": "Grego" },
  ru: { "en": "английский", "tr": "турецкий", "es": "испанский", "fr": "французский", "de": "немецкий", "it": "итальянский", "pt": "португальский", "ru": "русский", "zh": "китайский", "ja": "японский", "ar": "арабский", "ko": "корейский", "hi": "хинди", "fa": "персидский", "nl": "голландский", "sv": "шведский", "no": "норвежский", "da": "датский", "fi": "финский", "el": "греческий" },
  zh: { "en": "英语", "tr": "土耳其语", "es": "西班牙语", "fr": "法语", "de": "德语", "it": "意大利语", "pt": "葡萄牙语", "ru": "俄语", "zh": "中文", "ja": "日语", "ar": "阿拉伯语", "ko": "韩语", "hi": "印地语", "fa": "波斯语", "nl": "荷兰语", "sv": "瑞典语", "no": "挪威语", "da": "丹麦语", "fi": "芬兰语", "el": "希腊语" },
  ja: { "en": "英語", "tr": "トルコ語", "es": "スペイン語", "fr": "フランス語", "de": "ドイツ語", "it": "イタリア語", "pt": "ポルトガル語", "ru": "ロシア語", "zh": "中国語", "ja": "日本語", "ar": "アラビア語", "ko": "韓国語", "hi": "ヒンディー語", "fa": "ペルシャ語", "nl": "オランダ語", "sv": "スウェーデン語", "no": "ノルウェー語", "da": "デンマーク語", "fi": "フィンランド語", "el": "ギリシャ語" },
  ar: { "en": "الإنجليزية", "tr": "التركية", "es": "الإسبانية", "fr": "الفرنسية", "de": "الألمانية", "it": "الإيطالية", "pt": "البرتغالية", "ru": "الروسية", "zh": "الصينية", "ja": "اليابانية", "ar": "العربية", "ko": "الكورية", "hi": "الهندية", "fa": "الفارسية", "nl": "الهولندية", "sv": "السويدية", "no": "النرويجية", "da": "الدنماركية", "fi": "الفنلندية", "el": "اليونانية" },
  ko: { "en": "영어", "tr": "터키어", "es": "스페인어", "fr": "프랑스어", "de": "독일어", "it": "이탈리아어", "pt": "포르투갈어", "ru": "러시아어", "zh": "중국어", "ja": "일본어", "ar": "아랍어", "ko": "한국어", "hi": "힌디어", "fa": "페르시아어", "nl": "네덜란드어", "sv": "스웨덴어", "no": "노르웨이어", "da": "덴마크어", "fi": "핀란드어", "el": "그리스어" },
  hi: { "en": "अंग्रेज़ी", "tr": "तुर्की", "es": "स्पेनिश", "fr": "फ़्रांसीसी", "de": "जर्मन", "it": "इतालवी", "pt": "पुर्तगाली", "ru": "रूसी", "zh": "चीनी", "ja": "जापानी", "ar": "अरबी", "ko": "कोरियाई", "hi": "हिन्दी", "fa": "फ़ारसी", "nl": "डच", "sv": "स्वीडिश", "no": "नॉर्वेजियाई", "da": "डेनिश", "fi": "फिनिश", "el": "यूनानी" },
  fa: { "en": "انگلیسی", "tr": "ترکی", "es": "اسپانیایی", "fr": "فرانسوی", "de": "آلمانی", "it": "ایتالیایی", "pt": "پرتغالی", "ru": "روسی", "zh": "چینی", "ja": "ژاپنی", "ar": "عربی", "ko": "کره ای", "hi": "هندی", "fa": "فارسی", "nl": "هلندی", "sv": "سوئدی", "no": "نروژی", "da": "دانمارکی", "fi": "فنلاندی", "el": "یونانی" },
  nl: { "en": "Engels", "tr": "Turks", "es": "Spaans", "fr": "Frans", "de": "Duits", "it": "Italiaans", "pt": "Portugees", "ru": "Russisch", "zh": "Chinees", "ja": "Japans", "ar": "Arabisch", "ko": "Koreaans", "hi": "Hindi", "fa": "Perzisch", "nl": "Nederlands", "sv": "Zweeds", "no": "Noors", "da": "Deens", "fi": "Fins", "el": "Grieks" },
  sv: { "en": "Engelska", "tr": "Turkiska", "es": "Spanska", "fr": "Franska", "de": "Tyska", "it": "Italienska", "pt": "Portugisiska", "ru": "Ryska", "zh": "Kinesiska", "ja": "Japanska", "ar": "Arabiska", "ko": "Koreanska", "hi": "Hindi", "fa": "Persiska", "nl": "Holländska", "sv": "Svenska", "no": "Norska", "da": "Danska", "fi": "Finska", "el": "Grekiska" },
  no: { "en": "Engelsk", "tr": "Tyrkisk", "es": "Spansk", "fr": "Fransk", "de": "Tysk", "it": "Italiensk", "pt": "Portugisisk", "ru": "Russisk", "zh": "Kinesisk", "ja": "Japansk", "ar": "Arabisk", "ko": "Koreansk", "hi": "Hindi", "fa": "Persisk", "nl": "Nederlandsk", "sv": "Svensk", "no": "Norsk", "da": "Dansk", "fi": "Finsk", "el": "Gresk" },
  da: { "en": "Engelsk", "tr": "Tyrkisk", "es": "Spansk", "fr": "Fransk", "de": "Tysk", "it": "Italiensk", "pt": "Portugisisk", "ru": "Russisk", "zh": "Kinesisk", "ja": "Japansk", "ar": "Arabisk", "ko": "Koreansk", "hi": "Hindi", "fa": "Persisk", "nl": "Hollandsk", "sv": "Svensk", "no": "Norsk", "da": "Dansk", "fi": "Finsk", "el": "Græsk" },
  fi: { "en": "Englanti", "tr": "Turkki", "es": "Espanja", "fr": "Ranska", "de": "Saksa", "it": "Italia", "pt": "Portugali", "ru": "Venäjä", "zh": "Kiina", "ja": "Japani", "ar": "Arabia", "ko": "Korea", "hi": "Hindi", "fa": "Persia", "nl": "Hollanti", "sv": "Ruotsi", "no": "Norja", "da": "Tanska", "fi": "Suomi", "el": "Kreikka" },
  el: { "en": "Αγγλικά", "tr": "Τουρκικά", "es": "Ισπανικά", "fr": "Γαλλικά", "de": "Γερμανικά", "it": "Ιταλικά", "pt": "Πορτογαλικά", "ru": "Ρωσικά", "zh": "Κινέζικα", "ja": "Ιαπωνικά", "ar": "Αραβικά", "ko": "Κορεατικά", "hi": "Χίντι", "fa": "Περσικά", "nl": "Ολλανδικά", "sv": "Σουηδικά", "no": "Νορβηγικά", "da": "Δανέζικα", "fi": "Φινλανδικά", "el": "Ελληνικά" }
};

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

      <DropdownMenuContent className="grid grid-cols-2 2xl:grid-cols-1">
        {i18n.locales.map(locale => (
          <DropdownMenuItem key={locale} onClick={() => handleLanguageChange(locale)}>
            <p className='flex gap-2 items-center'>{languageNames[lang][locale]} {lang === locale && <FaCheck />}</p>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
