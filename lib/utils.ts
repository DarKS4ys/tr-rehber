import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import type { Message } from "ai";
import type { Locale } from "@/i18n.config";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

export const validateString = (value: unknown, maxLength: number) => {
  if (!value || typeof value !== 'string') {
      return false
  }

  return true
}

export const extractErrorMessage = (error: unknown): string => {
  let message: string
  if (error instanceof Error) {
    message = error.message
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message)
  } else if (typeof error === 'string') {
    message = error
  } else {
    message = 'Something went wrong'
  }

  return message
}

export const truncateText = (text: string | null | undefined, chars: number): string => {
  if (text && text.length > chars) {
    return text.substring(0, chars) + '...';
  }
  
  if (text) {
    return text;
  } else {
    return 'Loading...'
  }
};

/* export const isAuthenticated = async () => {
  try {
    const session = await getServerSession(authOptions);
    return session?.user?.status === 'Admin';
  } catch (error) {
    console.error('Error fetching session:', error);
    return false;
  }
}; */

export const initialMessages: Message[] = [
  {
    role: "assistant",
    id: "0",
    content:
      "Hi! Feel free to ask me any additional info regarding this place or other questions in your mind.",
  },
];

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const languageEmojis = {
  "en": "🇺🇸",
  "tr": "🇹🇷",
  "es": "🇪🇸",
  "fr": "🇫🇷",
  "de": "🇩🇪",
  "it": "🇮🇹",
  "pt": "🇵🇹",
  "ru": "🇷🇺",
  "zh": "🇨🇳",
  "ja": "🇯🇵",
  "ar": "🇸🇦",
  "ko": "🇰🇷",
  "hi": "🇮🇳",
  "fa": "🇮🇷",
  "nl": "🇳🇱",
  "sv": "🇸🇪",
  "no": "🇳🇴",
  "da": "🇩🇰",
  "fi": "🇫🇮",
  "el": "🇬🇷"
};

export function getLanguageEmoji(code: Locale) {
  return languageEmojis[code] || "❓"; // Return question mark if emoji is not found
}

const languageNames = {
  "en": "English",
  "tr": "Turkish",
  "es": "Spanish",
  "fr": "French",
  "de": "German",
  "it": "Italian",
  "pt": "Portuguese",
  "ru": "Russian",
  "zh": "Chinese",
  "ja": "Japanese",
  "ar": "Arabic",
  "ko": "Korean",
  "hi": "Hindi",
  "fa": "Persian",
  "nl": "Dutch",
  "sv": "Swedish",
  "no": "Norwegian",
  "da": "Danish",
  "fi": "Finnish",
  "el": "Greek"
};

export function getLanguageName(code: Locale) {
  return languageNames[code] || "Unknown"; // Return "Unknown" if long name is not found
}

const localLanguageNames: {
  [key: string]: {
    [key: string]: string;
  };
} = {
  "en": { en: "English", tr: "English", es: "English", fr: "English", de: "English", it: "English", pt: "English", ru: "English", zh: "English", ja: "English", ar: "English", ko: "English", hi: "English", fa: "English", nl: "English", sv: "English", no: "English", da: "English", fi: "English", el: "English" },
  "tr": { en: "Turkish", tr: "Türkçe", es: "Turco", fr: "Turc", de: "Türkisch", it: "Turco", pt: "Turco", ru: "турецкий", zh: "土耳其语", ja: "トルコ語", ar: "التركية", ko: "터키어", hi: "तुर्की", fa: "ترکی", nl: "Turks", sv: "Turkiska", no: "Tyrkisk", da: "Tyrkisk", fi: "Turkki", el: "Τούρκικα" },
  "es": { en: "Spanish", tr: "Español", es: "Español", fr: "Espagnol", de: "Spanisch", it: "Spagnolo", pt: "Espanhol", ru: "испанский", zh: "西班牙语", ja: "スペイン語", ar: "الإسبانية", ko: "스페인어", hi: "स्पेनिश", fa: "اسپانیایی", nl: "Spaans", sv: "Spanska", no: "Spansk", da: "Spansk", fi: "Espanjalainen", el: "Ισπανικά" },
  "fr": { en: "French", tr: "Français", es: "Francés", fr: "Français", de: "Französisch", it: "Francese", pt: "Francês", ru: "французский", zh: "法语", ja: "フランス語", ar: "الفرنسية", ko: "프랑스어", hi: "फ़्रांसीसी", fa: "فرانسوی", nl: "Frans", sv: "Franska", no: "Fransk", da: "Fransk", fi: "Ranskalainen", el: "Γαλλικά" },
  "de": { en: "German", tr: "Almanca", es: "Alemán", fr: "Allemand", de: "Deutsch", it: "Tedesco", pt: "Alemão", ru: "немецкий", zh: "德语", ja: "ドイツ語", ar: "الألمانية", ko: "독일어", hi: "जर्मन", fa: "آلمانی", nl: "Duits", sv: "Tyska", no: "Tysk", da: "Tysk", fi: "Saksalainen", el: "Γερμανικά" },
  "it": { en: "Italian", tr: "İtalyanca", es: "Italiano", fr: "Italien", de: "Italienisch", it: "Italiano", pt: "Italiano", ru: "итальянский", zh: "意大利语", ja: "イタリア語", ar: "الإيطالية", ko: "이탈리아어", hi: "इतालवी", fa: "ایتالویایی", nl: "Italiaans", sv: "Italienska", no: "Italiensk", da: "Italiensk", fi: "Italiankielinen", el: "Ιταλικά" },
  "pt": { en: "Portuguese", tr: "Portekizce", es: "Portugués", fr: "Portugais", de: "Portugiesisch", it: "Portoghese", pt: "Português", ru: "португальский", zh: "葡萄牙语", ja: "ポルトガル語", ar: "البرتغالية", ko: "포르투갈어", hi: "पुर्तगाली", fa: "پرتغالی", nl: "Portugees", sv: "Portugisiska", no: "Portugisisk", da: "Portugisisk", fi: "Portugalilainen", el: "Πορτογαλικά" },
  "ru": { en: "Russian", tr: "Rusça", es: "Ruso", fr: "Russe", de: "Russisch", it: "Russo", pt: "Russo", ru: "русский", zh: "俄语", ja: "ロシア語", ar: "الروسية", ko: "러시아어", hi: "रूसी", fa: "روسی", nl: "Russisch", sv: "Ryska", no: "Russisk", da: "Russisk", fi: "Venäjänkielinen", el: "Ρωσικά" },
  "zh": { en: "Chinese", tr: "Çince", es: "Chino", fr: "Chinois", de: "Chinesisch", it: "Cinese", pt: "Chinês", ru: "китайский", zh: "中文", ja: "中国語", ar: "الصينية", ko: "중국어", hi: "चीनी", fa: "چینی", nl: "Chinees", sv: "Kinesiska", no: "Kinesisk", da: "Kinesisk", fi: "Kiinalainen", el: "Κινέζικα" },
  "ja": { en: "Japanese", tr: "Japonca", es: "Japonés", fr: "Japonais", de: "Japanisch", it: "Giapponese", pt: "Japonês", ru: "японский", zh: "日语", ja: "日本語", ar: "اليابانية", ko: "일본어", hi: "जापानी", fa: "ژاپنی", nl: "Japans", sv: "Japanska", no: "Japansk", da: "Japansk", fi: "Japanilainen", el: "Ιαπωνικά" },
  "ar": { en: "Arabic", tr: "Arapça", es: "Árabe", fr: "Arabe", de: "Arabisch", it: "Arabo", pt: "Árabe", ru: "арабский", zh: "阿拉伯语", ja: "アラビア語", ar: "العربية", ko: "아랍어", hi: "अरबी", fa: "عربی", nl: "Arabisch", sv: "Arabiska", no: "Arabisk", da: "Arabisk", fi: "Arabialainen", el: "Αραβικά" },
  "ko": { en: "Korean", tr: "Korece", es: "Coreano", fr: "Coréen", de: "Koreanisch", it: "Coreano", pt: "Coreano", ru: "корейский", zh: "韩语", ja: "韓国語", ar: "الكورية", ko: "한국어", hi: "कोरियाई", fa: "کره ای", nl: "Koreaans", sv: "Koreanska", no: "Koreansk", da: "Koreansk", fi: "Korealainen", el: "Κορεατικά" },
  "hi": { en: "Hindi", tr: "Hintçe", es: "Hindi", fr: "Hindi", de: "Hindi", it: "Hindi", pt: "Hindi", ru: "хинди", zh: "印地语", ja: "ヒンディー語", ar: "الهندية", ko: "힌디어", hi: "हिंदी", fa: "هندی", nl: "Hindi", sv: "Hindi", no: "Hindi", da: "Hindi", fi: "Hindi", el: "Χίντι" },
  "fa": { en: "Persian", tr: "Farsça", es: "Persa", fr: "Persan", de: "Persisch", it: "Persiano", pt: "Persa", ru: "персидский", zh: "波斯语", ja: "ペルシア語", ar: "الفارسية", ko: "페르시아어", hi: "फ़ारसी", fa: "فارسی", nl: "Perzisch", sv: "Persiska", no: "Persisk", da: "Persisk", fi: "Persialainen", el: "Περσικά" },
  "nl": { en: "Dutch", tr: "Hollandaca", es: "Holandés", fr: "Néerlandais", de: "Niederländisch", it: "Olandese", pt: "Holandês", ru: "нидерландский", zh: "荷兰语", ja: "オランダ語", ar: "هولندي", ko: "네덜란드어", hi: "डच", fa: "هلندی", nl: "Nederlands", sv: "Nederländska", no: "Nederlandsk", da: "Hollandsk", fi: "Hollantilainen", el: "Ολλανδικά" },
  "sv": { en: "Swedish", tr: "İsveççe", es: "Sueco", fr: "Suédois", de: "Schwedisch", it: "Svedese", pt: "Sueco", ru: "шведский", zh: "瑞典语", ja: "スウェーデン語", ar: "السويدية", ko: "스웨덴어", hi: "स्वीडिश", fa: "سوئدی", nl: "Zweeds", sv: "Svenska", no: "Svensk", da: "Svensk", fi: "Ruotsalainen", el: "Σουηδικά" },
  "no": { en: "Norwegian", tr: "Norveççe", es: "Noruego", fr: "Norvégien", de: "Norwegisch", it: "Norvegese", pt: "Norueguês", ru: "норвежский", zh: "挪威语", ja: "ノルウェー語", ar: "النرويجية", ko: "노르웨이어", hi: "नार्वेजियन", fa: "نروژی", nl: "Noors", sv: "Norska", no: "Norsk", da: "Norsk", fi: "Norjalainen", el: "Νορβηγικά" },
  "da": { en: "Danish", tr: "Danca", es: "Danés", fr: "Danois", de: "Dänisch", it: "Danese", pt: "Dinamarquês", ru: "датский", zh: "丹麦语", ja: "デンマーク語", ar: "الدنماركية", ko: "덴마크어", hi: "डैनिश", fa: "دانمارکی", nl: "Deens", sv: "Danska", no: "Dansk", da: "Dansk", fi: "Tanskalainen", el: "Δανικά" },
  "fi": { en: "Finnish", tr: "Fince", es: "Finlandés", fr: "Finnois", de: "Finnisch", it: "Finlandese", pt: "Finlandês", ru: "финский", zh: "芬兰语", ja: "フィンランド語", ar: "الفنلندية", ko: "핀란드어", hi: "फ़िनिश", fa: "فنلاندی", nl: "Fins", sv: "Finska", no: "Finsk", da: "Finsk", fi: "Suomalainen", el: "Φινλανδικά" },
  "el": { en: "Greek", tr: "Yunanca", es: "Griego", fr: "Grec", de: "Griechisch", it: "Greco", pt: "Grego", ru: "греческий", zh: "希腊语", ja: "ギリシャ語", ar: "اليونانية", ko: "그리스어", hi: "यूनानी", fa: "یونانی", nl: "Grieks", sv: "Grekiska", no: "Gresk", da: "Græsk", fi: "Kreikkalainen", el: "Ελληνικά" }
};

export function getLocalLanguageName(code: string, lang: string) {
  return localLanguageNames[code][lang] || "Unknown";
}