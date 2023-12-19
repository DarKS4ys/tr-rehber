import Image from 'next/image'
import React from 'react'

export default function DefaultBlur({src}: {src:any}) {
  return (
    <div className='relative w-full h-full'>
      <Image
        alt='image'
        src={src}
        fill
        className='object-cover object-bottom'
        placeholder='blur'
        priority={true}
        sizes="100vw"
      />
    </div>
  )
}
