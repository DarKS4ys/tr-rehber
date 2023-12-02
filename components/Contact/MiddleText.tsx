"use client"
import React from 'react'
import {motion} from 'framer-motion'
import ShinyButton from '../ShinyButton'
import Link from 'next/link'

export default function HeaderText({explore}: {explore: any}) {
  return (
    <motion.div
    initial={{ opacity: 0}}
    whileInView={{ opacity: 1}}
    transition={{duration: 1}}
    className='text-center hover:ring-2 hover:ring-offset-2 hover:backdrop-s-200 ring-offset-transparent ring-highlight duration-300 transition shadow-xl text-black dark:text-white flex flex-col gap-4 relative items-center bg-white dark:bg-neutral-900 rounded-xl px-12 py-8'
    >
        <h2 className="font-bold text-2xl md:text-4xl">{explore.title}</h2>
        <div className="flex flex-col gap-2 items-center">
          <Link href="/explore">
            <ShinyButton label={explore.buttonLabel}/>
          </Link>
          <p className='md:text-lg text-base text-muted-foreground my-2'>{explore.description}</p>
        </div>
    </motion.div>
  )
}
