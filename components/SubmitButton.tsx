

import React from 'react'
import { FaPaperPlane } from 'react-icons/fa'

export default function SubmitButton({buttonLabel}: {buttonLabel: any}) {
  return (
  <button 
    className="focus:scale-110 hover:scale-110 active:scale-105 group flex gap-2 items-center justify-center h-[3rem] w-[8rem] 
    rounded-full bg-highlight hover:bg-highlighthover outline-none transition-all 
    duration-200 text-white dark:text-black" 
    type='submit'>
        {buttonLabel}
      <FaPaperPlane className="transition duration-200 text-xs opacity-80 group-hover:-translate-y-1 group-hover:translate-x-1"/>
  </button>
  )
}
