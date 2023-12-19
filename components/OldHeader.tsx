"use client"
import React, { useEffect, useRef } from 'react'
import HeaderText from './HeaderText'
import {motion} from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import ParallaxFullImg from '../public/parallaxfull.jpg'
import ParallaxFullNightImg from '../public/parallaxfull-night.jpg'
import ParallaxBottomImg from '../public/parallax-bottom.webp'
import ParallaxBottomNightImg from '../public/parallax-bottom-night.webp'
import DefaultBlur from './static/DefaultBlur'
import AI from './AI'

export default function Header({header}: {header: any}) {
  const ref = useRef(null);
  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const backgroundYFadeOpacity = useTransform(scrollYProgress, [0.65, 0.85], ["100%", "0%"]);
  const textYFadeOpacity = useTransform(scrollYProgress, [0.6, 0.7], ["100%", "0%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "275%"]);
  const scaleTransform = useTransform(scrollYProgress, [0, 1], ["90%", "110%"]);
/* 
  useEffect(()=> {
    const lenis = new Lenis()
    lenis.on('scroll', (e:any) => {
  
    })

    function raf(time:any) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)
  }, []) */
  
  return (
    <div id="homepage" ref={ref} className='overflow-hidden h-screen w-full items-center flex flex-col py-[24vh] md:py-[12vh] 2xl:py-40 text-lg relative text-center p-4'>
      <motion.div className='z-20 relative' style={{ y: textY, scale: scaleTransform, opacity: textYFadeOpacity }}>
        {/*<div className='absolute bottom-24 md:bottom-32 2xl:bottom-48 right-5 w-full h-full justify-center flex z-10 drop-shadow-lg'>
          <ThreeDTest />
        </div> */}
        <HeaderText header={header} />
      </motion.div>

        <motion.div
          className='absolute inset-0 z-0 opacity-60 dark:opacity-80 dark:hidden'
          style={{
            backgroundPosition: "bottom",
            backgroundSize: "cover",
            y: backgroundY,
            opacity: backgroundYFadeOpacity,
          }}
        >
          {/* Use next/image for background */}
          <DefaultBlur src={ParallaxFullImg}/>
        <div className="absolute inset-0 z-10 bottom-[5rem]">
          <div className="h-full w-full bg-gradient-to-b from-white via-transparent to-transparent"></div>
        </div>
        </motion.div>


      <motion.div className='absolute inset-0 z-30 dark:hidden'
      style={{
        opacity: backgroundYFadeOpacity,
      }}
      >
        <div className='justify-center flex items-center absolute inset-0 top-[50%] z-50'>
          <AI/>
        </div>
        {/* Use next/image for background */}
        <Image
          quality={95}
          src={ParallaxBottomImg}
          alt="Background Image"
          fill
          placeholder='blur'
          className='object-cover object-bottom'
          loading='lazy'
        />
        <div className="absolute inset-0 z-10 top-[28rem]">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-white"></div>
        </div>
      </motion.div>
        
      <motion.div
        className='absolute inset-0 z-0 opacity-60 dark:opacity-80 dark:flex hidden'
        style={{
          backgroundPosition: "bottom",
          backgroundSize: "cover",
          y: backgroundY,
          opacity: backgroundYFadeOpacity,
        }}
      >
        <DefaultBlur src={ParallaxFullNightImg}/>
        <div className="absolute inset-0 z-10 bottom-[5rem]">
          <div className="h-full w-full bg-gradient-to-b from-neutral-950 via-transparent to-transparent"></div>
        </div>
      </motion.div>

      <div className='absolute inset-0 z-30 dark:flex hidden'
      >
      <motion.div
        style={{
          opacity: backgroundYFadeOpacity,
        }}
      >
        {/* Use next/image for background */}
        <Image
          quality={95}
          src={ParallaxBottomNightImg}
          alt="Background Image"
          fill
          className='object-cover object-bottom'
          placeholder='blur'
          loading='lazy'
        />
        </motion.div>
        <div className="absolute inset-0 z-10 top-[30rem]">
          <div className="h-full w-full bg-gradient-to-b from-transparent via-transparent to-background"></div>
        </div>
      </div>
    </div>
  );
}