"use client"
import { DropdownMenu } from '@radix-ui/react-dropdown-menu';
import { usePathname, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu';
import { Button } from './ui/button';
import {VscCircleFilled} from 'react-icons/vsc'
import {BiChevronDown} from 'react-icons/bi'
import { useLanguage } from '@/app/[lang]/languageContext';
import clsx from 'clsx';

export default function LangSwitch({navbar}: {navbar:any}) {
    const router = useRouter();
    const pathname = usePathname()
    const { selectedLanguage } = useLanguage();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track the dropdown's open state

    const [currentLang, setCurrentLang] = useState<string | string[]>("...")
    
    useEffect(() => {
        if(selectedLanguage == "tr") {
          setCurrentLang("Türkçe");
        } else if (selectedLanguage == "en") {
          setCurrentLang("English")
        } else {
          setCurrentLang("?")
        }
    }, [selectedLanguage])

    const changeLang = (newLang: string) => {
      if (selectedLanguage != newLang) {
        let lang = newLang
        const currentRoute = pathname.replace(/^\/[a-zA-Z]{2}/, ''); // Remove the existing language from the pathname
        
        const newUrl = `/${lang}${currentRoute}`
        router.push(newUrl)
      }
    }

    return (
      <DropdownMenu onOpenChange={(isOpen) => setIsDropdownOpen(isOpen)}>
        <DropdownMenuTrigger asChild>
          <Button className='bg-highlight hover:bg-highlighthover duration-200'>
          <p>{currentLang}</p>
          <BiChevronDown size={20} className={clsx('transition-transform', isDropdownOpen ? 'rotate-0' : '-rotate-90')} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
      <DropdownMenuItem key="en" onClick={() => changeLang("en")} >
          <p className='flex gap-2 items-center'>
            {navbar.langswitcher.english}
            {currentLang == "English" ?
            <VscCircleFilled/>
            : null}
          </p>
        </DropdownMenuItem>
        <DropdownMenuItem key="tr" onClick={() => changeLang("tr")} >
          <p className='flex gap-2 items-center text-popover-foreground'>
          {navbar.langswitcher.turkish}
            {currentLang == "Türkçe" ?
            <VscCircleFilled/>
            : null}
          </p>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
