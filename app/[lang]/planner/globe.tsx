'use client';
import Spline from '@splinetool/react-spline';
import { Suspense } from 'react';
export default function Globe() {
  return (
    <Suspense fallback={<div className='w-full h-full bg-primary/20 animate-pulse'></div>}>
          <Spline scene="https://prod.spline.design/nQCxf8khpyKp8gqd/scene.splinecode" />

      </Suspense>
  );
}
