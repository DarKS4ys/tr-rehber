import React from 'react';
import { ParallaxText } from './Parallax';

export default function Marquee() {
  return (
    <section className="py-16">
      <div
        className="mx-auto max-w-7xl relative"
      >
        <div className="absolute left-0 h-full bg-gradient-to-r from-white dark:from-background to-transparent w-[25%] z-20" />
        <div className="absolute right-0 h-full bg-gradient-to-l from-white dark:from-background to-transparent w-[25%] z-20" />
        <ParallaxText baseVelocity={-5}>Trabzon</ParallaxText>
        <ParallaxText baseVelocity={5}>Rehberim</ParallaxText>
      </div>
    </section>
  );
}
