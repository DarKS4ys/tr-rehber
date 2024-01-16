'use client';

import React, { useState, useRef, useEffect } from 'react';
import { IoPlay, IoPause, IoVolumeMedium } from 'react-icons/io5';

export default function AudioPreview({ fileUrl }: { fileUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [volume, setVolume] = useState(1);
  const audioRef = useRef(new Audio());

  const handlePlayPause = async () => {
    if (!audioRef.current.src) {
      setIsLoading(true);
      await loadAudio();
      setIsLoading(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const loadAudio = async () => {
    audioRef.current.src = fileUrl;
    await audioRef.current.load();
    audioRef.current.volume = volume; // Set the initial volume
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume); // Update the state with the new volume
    audioRef.current.volume = newVolume;
  };

  useEffect(() => {
    // Create a variable to hold the current value of audioRef
    const currentAudioRef = audioRef.current;

    // Cleanup when the component unmounts
    return () => {
      if (currentAudioRef) {
        // Check if the currentAudioRef is not null or undefined
        currentAudioRef.pause();
        /* currentAudioRef.src = ''; */ // Uncomment this line if needed
      }
    };
  }, [audioRef]);

  return (
    <div className="flex flex-col gap-2 items-center">
      <button onClick={handlePlayPause}>
        {isPlaying ? <IoPause size={48} /> : <IoPlay size={48} />}
      </button>

      {isPlaying && (
        <div className="flex gap-2">
          <IoVolumeMedium size={24} />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
          />
        </div>
      )}

      {isLoading && <div>Loading...</div>}
    </div>
  );
}
