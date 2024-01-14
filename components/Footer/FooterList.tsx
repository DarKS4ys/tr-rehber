"use client"

import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';

export default function FooterList({footer}: {footer: any}) {
      
  const navigationOptions = footer.navigation.options
  const socialsOptions = footer.socials.options

  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        scale: 0.7,
    },
    animate: (index: number) => ({
        opacity: 1,
        scale: 1,
        transition: {
          delay: 0.05 * index,
          type: "spring",
          stiffness: 180,
          damping: 20
        }
    })
  }

  return (
    <div className="flex gap-3 md:gap-8 ">
    <div className='flex flex-col gap-2 text-sm md:text-base'>
      <motion.h1 className='font-medium'
      initial={{ opacity: 0}}
      whileInView={{ opacity: 1}}
      >{footer.navigation.title}
      </motion.h1>
      <ul className="text-muted-foreground flex flex-col gap-1">
        {Object.entries(navigationOptions).map(([key, value]) => (
          <Link className='hover:underline' href={`#${key}`} key={key}>
            <motion.p
            custom={key}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            >
            {typeof value === 'string' ? value : null}
            </motion.p>
          </Link>
        ))}
      </ul>
    </div>
{/*     <div className='flex flex-col gap-2 text-sm md:text-base'>
      <motion.h1 className='font-medium'
        initial={{ opacity: 0}}
        whileInView={{ opacity: 1}}
      >{footer.socials.title}</motion.h1>
      <ul className="text-muted-foreground flex flex-col gap-1">
      {Object.entries(socialsOptions).map(([key, value]) => (
        <Link className='hover:underline' href={`#${key}`} key={key}>
          <motion.p
            custom={key}
            variants={fadeInAnimationVariants}
            initial="initial"
            whileInView="animate"
            >
            {typeof value === 'string' ? value : null}
          </motion.p>
        </Link>
      ))}
      </ul>
    </div> */}
  </div>
  )
}
