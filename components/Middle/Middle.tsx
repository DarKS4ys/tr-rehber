"use client"
import React, { useRef } from 'react'
import { useScroll, useTransform, motion } from 'framer-motion'
import MiddleText from '../Contact/MiddleText'
import Image from 'next/image'
import useDimension from '@/lib/useDimension'

import one from '@/public/images/1.jpg'
import two from '@/public/images/2.jpg'
import three from '@/public/images/3.jpg'
import four from '@/public/images/4.jpg'
import five from '@/public/images/5.jpg'
import six from '@/public/images/6.jpg'
import seven from '@/public/images/7.jpg'
import eight from '@/public/images/8.webp'
import nine from '@/public/images/9.jpg'
import ten from '@/public/images/10.jpg'
import eleven from '@/public/images/11.jpg'
import twelve from '@/public/images/12.webp'

import styles from '@/components/styles/middle.module.css'

const images = [
  one,
  two,
  three,
  four,
  five,
  six,
  seven,
  eight,
  nine,
  ten,
  eleven,
  twelve,
]

const fadeInAnimationVariants = { // for framer motion  
  initial: {
      opacity: 0,
      scale: 0.7,
      y: 100,
  },
  animate: (index: number) => ({
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
        type: "spring",
        stiffness: 260,
        damping: 20
      }
  })
}

export default function Middle({middle}: {middle: any}) {

  const ref = useRef(null);

  const {scrollYProgress} = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })

  const {height} = useDimension()

  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2.2])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3])
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25])
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 2.9])
  
  const backgroundYFadeOpacity = useTransform(scrollYProgress, [0.85, 0.95], ["100%", "0%"]);
  const backgroundYFadeOpacityIn = useTransform(scrollYProgress, [0, 0.15], ["0%", "100%"]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, height * 1.65]);

  return (
    <motion.section id="explore" className='py-8 relative max-w-8xl mx-auto' style={{opacity: backgroundYFadeOpacityIn}}>
    <main className='relative overflow-hidden'>
    <div className="absolute z-10 -top-28 w-full h-[40rem] pointer-events-none">
        <div className="h-full w-full bg-gradient-to-b from-background via-transparent to-transparent"></div>
      </div>

      <div className="hidden justify-center items-center md:flex flex-col">
        <motion.div className="absolute z-10 top-0 md:p-0 p-4" style={{ y: textY, opacity: backgroundYFadeOpacity }}>
            <MiddleText explore={middle.explore} />
        </motion.div>
      </div>

      <div className="flex justify-center items-center md:hidden flex-col">
        <motion.div className="absolute z-10 top-[23rem] p-4" style={{ opacity: backgroundYFadeOpacity }}>
          <MiddleText explore={middle.explore} />
        </motion.div>
      </div>
      
      <div className='md:hidden block h-[62.5rem]'>
        <div ref={ref} className={styles.gallery} style={{ zIndex:0}}>
          <Column images={[images[0], images[1], images[2], images[6], images[8], images[9]]} opacity={backgroundYFadeOpacity} />
          <Column images={[images[3], images[4], images[5], images[7], images[10], images[11]]} opacity={backgroundYFadeOpacity}/>
        </div>
      </div>
      <div className='md:block hidden'>
        <div ref={ref} className={styles.gallery} style={{ zIndex:0}}>
          <Column images={[images[0], images[1], images[2]]} y={y} opacity={backgroundYFadeOpacity} />
          <Column images={[images[3], images[4], images[5]]} y={y2} opacity={backgroundYFadeOpacity}/>
          <Column images={[images[6], images[7], images[8]]} y={y3} opacity={backgroundYFadeOpacity}/>
          <Column images={[images[9], images[10], images[11]]} y={y4} opacity={backgroundYFadeOpacity}/>
        </div>
      </div>
    </main>
    </motion.section>
  );
  }

  const Column = ({images, y=0, opacity}: {images:any, y?:any, opacity: any}) => {
    return(
      <motion.div
      style={{y, opacity}}
      className={styles.column}
      initial={{opacity: 0, scale:0.85}}
      whileInView={{opacity: 1, scale:1}}
      transition={{duration: 1}}
      >
      {
        images.map((src: any, index: string) => (
          <React.Fragment key={index}>
            <motion.div
              className={`${styles.imageContainer} md:hidden`}
              custom={index}
              variants={fadeInAnimationVariants}
              initial="initial"
              whileInView="animate"
              viewport={{
                once: true,
              }}
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 1,
              }}
            >
              <Image
                src={src}
                fill
                alt="image"
                className="object-cover hover:scale-110 transition duration-500"
                priority={false}
                placeholder="blur"
                sizes="100vw"
              />
            </motion.div>

            <div
              key={`image-container-${index}`}
              className={`${styles.imageContainer} hidden md:flex`}
            >
              <Image
                src={src}
                fill
                alt="image"
                className="object-cover hover:scale-110 transition duration-500"
                priority={false}
                placeholder="blur"
                sizes="100vw"
              />
            </div>
          </React.Fragment>
        ))
      }
      </motion.div>
    )
  }
