'use client';

import React from 'react';
import { motion } from 'framer-motion';
import TiltCard from './TiltCard';
import { Blocks, BrainCircuit, CircleUser } from 'lucide-react';

export default function Features({featuresLocalization}: {featuresLocalization: any}) {
  const fadeInAnimationVariants = {
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index * 2.5,
      },
    }),
  };

  const features = [
    {
      name: featuresLocalization.card1.title,
      icon: <Blocks size={72}/>,
      description:
        featuresLocalization.card1.description,
      color:
        'bg-gradient-to-br from-green-600/70 to-green-800 dark:from-green-300 dark:to-green-600/70',
    },
  
    {
      name: featuresLocalization.card2.title,
      icon: <BrainCircuit size={72}/>,
      description:
        featuresLocalization.card2.description,
      color:
        'bg-gradient-to-br from-primary/50 to-red-500 dark:from-primary/20 dark:to-red-500/70',
    },
  
    {
      name: featuresLocalization.card3.title,
      icon: <CircleUser size={72}/>,
      description:
        featuresLocalization.card3.description,
      color:
        'bg-gradient-to-br from-blue-300 to-purple-500 dark:from-blue-300 dark:to-purple-500/70',
    },
  ];

  return (
    <motion.div className="max-w-7xl grid mx-auto grid-cols-1 lg:grid-cols-3 gap-4 w-full mb-16"
    >
      {features.map((feature, i) => (
        <motion.div
          variants={fadeInAnimationVariants}
          initial="initial"
          whileInView="animate"
          viewport={{
            once: true,
          }}
          custom={i}
          key={i}
        >
          <TiltCard color={feature.color} icon={feature.icon} description={feature.description} title={feature.name}/>
        </motion.div>
      ))}
    </motion.div>
  );
}
