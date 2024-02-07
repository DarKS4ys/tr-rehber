export const i18n = {
    defaultLocale: "en",
    locales: ["en", "tr", "es", "fr", "de", "it", "pt", "ru", "zh", "ja", "ar", "ko", "hi", "fa", "nl", "sv", "no", "da", "fi", "el"]
} as const

export type Locale = (typeof i18n)['locales'][number]