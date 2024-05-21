'use client'
import {Mic, StopCircle} from 'lucide-react'
import { Button } from './ui/button'
import React, { useState } from 'react'
import {BiStop} from "react-icons/bi";
import clsx from "clsx";

export default function ListenButton({ localListen, audioLink }: { localListen: string, audioLink: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
      <Button className={clsx("font-semibold gap-1", isPlaying && 'animate-pulse')} onClick={togglePlayback}>
        {!isPlaying && <Mic />}
        {isPlaying ? <StopCircle/> : localListen}
        <audio ref={audioRef} src={audioLink} />
      </Button>
  );
}
