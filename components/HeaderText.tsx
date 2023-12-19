"use client"
import React from 'react'
import {motion} from 'framer-motion'

export default function HeaderText({ header }: { header: any }) {
  return (
    <motion.div
    initial={{y:100, opacity: 0}}
    animate={{y:0, opacity: 1}}
    className='flex flex-col gap-2 md:gap-0 2xl:gap-4 relative drop-shadow-lg'
    >
        <h2 className="font-bold text-4xl 2xl:text-5xl">{header.welcome}</h2>
        <h1 className='font-bold text-highlight text-6xl md:text-8xl 2xl:text-[8rem]'>{header.city}</h1>
        <p className='2xl:text-lg text-base text-muted-foreground my-2'>{header.description}</p>
    </motion.div>
  )
}
