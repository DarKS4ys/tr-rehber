"use client"
import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({
  selectedLanguage: 'en',
  setSelectedLanguage: (lang: "en" | "tr") => {},
});

export function LanguageProvider({ children, initialLanguage }: { children: React.ReactNode, initialLanguage: string }) {
  const [selectedLanguage, setSelectedLanguage] = useState<string>(initialLanguage);

  return (
    <LanguageContext.Provider value={{ selectedLanguage, setSelectedLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
