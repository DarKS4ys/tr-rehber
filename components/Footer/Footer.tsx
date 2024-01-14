"use client"

import React from 'react'
import FooterList from './FooterList'
import { motion } from 'framer-motion';

export default function Footer({footer}: {footer:any}) {
  const fadeInAnimationVariants = { // for framer motion  
    initial: {
        opacity: 0,
        scale: 0.7,
        x: -100,
    },
    animate: (index: number) => ({
        opacity: 1,
        scale: 1,
        x: 0,
        transition: {
          delay: 0.05 * index,
          type: "spring",
          stiffness: 160,
          damping: 20
        }
    })
  }

  return (
    <motion.section className='p-6 py-8 md:p-12 h-52 flex justify-center items-center border-t border-border'
    initial={{y: 75}}
    whileInView={{y: 0}}
    >
      <div className='w-[min(100%,1200px)] flex justify-between h-full'>
        <motion.div className="flex flex-col justify-between h-full"
        variants={fadeInAnimationVariants}
        initial="initial"
        whileInView="animate"
        viewport={{
          once: true,
        }}
        >
            <h1 className='tracking-wide md:text-3xl font-semibold flex flex-col gap-4'>
              <p>{footer.title}</p>

              <p className='text-xs md:text-sm font-light text-muted-foreground'>{footer.legal}</p>
            </h1>
        </motion.div>
        <FooterList footer={footer}/>
      </div>
    </motion.section>
  )
}
