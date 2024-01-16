'use client'
import { Mic } from 'lucide-react'
import { Button } from './ui/button'

import React from 'react'

export default function ListenButton({localListen}: {localListen: string}) {
  return (
    <Button className="gap-1"><Mic/>{localListen}</Button>
  )
}
