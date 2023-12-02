"use client"

import React from 'react'
import ContactInner from './ContactInner'
import { motion } from 'framer-motion';

export default function Contact({contact}: {contact: any}) {
  return (
    <motion.section id="contact"
    initial={{ opacity: 0, y:-75}}
    whileInView={{opacity:1, y:0}}
    transition={{duration: .6}}
    >
      <ContactInner contact={contact}/>
    </motion.section>
  )
}
