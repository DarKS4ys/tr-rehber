"use client"
import type { Locale } from '@/i18n.config';
import type { Place } from '@prisma/client';
import dynamic from 'next/dynamic';
import React from 'react'
const Plyr = dynamic(() => import('plyr-react'), { ssr: false });

export default function VideoPlayer({place, lang}: {place: any, lang:Locale}) {
  return (
    <div>
    <Plyr
    source={{
      type: 'video',
      sources: [
        {
          src: (place?.videoUrl as { [key in Locale]: string })[lang],
          type: 'video/mp4',
        },
      ],
    }}
/*     options={{
      controls: [
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
    }} */
    /*   onPlay={handlePlay}
onPause={handlePause} */
  />
  </div>
  )
}
