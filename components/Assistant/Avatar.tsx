'use client';

import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { BiMicrophone, BiMicrophoneOff } from 'react-icons/bi';
import AvatarImage from '@/public/Avatar.png';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import clsx from 'clsx';
import { PiSparkleFill } from 'react-icons/pi';

export default function Avatar({username}: {username: string | undefined | null}) {
  const [text, setText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const [AIResponse, setAIResponse] = useState('');

  const [isLoading, setIsLoading] = useState(false);

  const [responseHeight, setResponseHeight] = useState(0);

  const [imageHover, setImageHover] = useState(false);

  const [width, setWidth] = useState('auto');

  const [audio, setAudio] = useState('');
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const breakpoints = {
    small: 500,
    medium: 768,
    large: 1600,
  };

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  useEffect(() => {
    if (audio && audioRef.current) {
      audioRef.current.play();
    }
  }, [audio]);

  useLayoutEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= breakpoints.medium) {
        setWidth('220px');
      } else if (width <= breakpoints.large) {
        setWidth('350px');
      } else {
        setWidth('400px');
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const lineHeight = 28;
    const fontSize = 20;
    const charactersPerLine = 22;
    const totalCharacters = AIResponse.length;

    let charactersPerLineAdjusted = charactersPerLine;
    if (width === '220px') {
      charactersPerLineAdjusted = 13;
    } else if (width === '350px') {
      charactersPerLineAdjusted = 23;
    } else {
      charactersPerLineAdjusted = 28;
    }

    const totalLines = Math.ceil(totalCharacters / charactersPerLineAdjusted);
    const pxHeight = totalLines * (lineHeight * 1.138) + fontSize;
    setResponseHeight(pxHeight);

    console.log(totalLines);
  }, [AIResponse, width]);

  const handleSpeech = async (newtext: string) => {
    setIsLoading(true);

    try {
      if (newtext) {
        const fullApiResponse = await fetch('/api/openai', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: newtext, name: username }),
        });

        const responseData = await fullApiResponse.json();
        setAIResponse(responseData.response);

        // audio
        const audioResponse = await fetch('/api/elevenlabs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ textInput: responseData.response }),
        });

        const arrayBuffer = await audioResponse.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: 'audio/mpeg' });
        const blobUrl = URL.createObjectURL(blob);
        setAudio(blobUrl);
      }
    } catch (error) {
      console.error('stack-error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startListening = () => {
    try {
      setAIResponse('');
      setIsLoading(false);
      setIsListening(false);

      if (!('webkitSpeechRecognition' in window) || !isSupported ) {
        return;
      }

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = 'tr-TR';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleSpeech(transcript)
        setText(transcript);
      };
      recognition.start();
  
      recognition.onstart = () => {
        setIsListening(true);
      };
      recognition.onend = () => {
        setIsListening(false);
      };
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageHover = () => {
    setImageHover(true);
  };

  const handleImageHoverRevoke = () => {
    setImageHover(false);
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div
        onMouseEnter={handleImageHover}
        onMouseLeave={handleImageHoverRevoke}
        className="flex relative h-full w-full flex-col justify-center items-center"
      >
        <div className="inset-0 absolute -left-4 -z-10">
          <Image
            alt="Avatar Image"
            src={AvatarImage}
            fill
            priority
            quality={97}
            placeholder="blur"
            className="object-cover"
          />
        </div>
        {!isSupported && (
          <div className="absolute top-5 px-16 text-center">
            <p>Speech recognition is not supported in your browser.</p>
          </div>
        )}
        <div className="mt-[50svh]">
          <>
            <AnimatePresence>
              {(isListening || isLoading || AIResponse) && (
                <motion.div
                  initial={{ width: 'auto' }}
                  animate={
                    AIResponse
                      ? { width: width, height: `${responseHeight}px` }
                      : { width: width, height: 'auto' }
                  }
                  onMouseEnter={handleImageHover}
                  exit={{ width: 'auto' }}
                  className={clsx(
                    'flex items-center justify-center gap-4 rounded-xl border border-white backdrop-blur-2xl bg-white/70 text-main',
                    isListening && 'animate-pulse'
                  )}
                >
                  <BiMicrophone size={64} className="ml-4" />
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3, type: 'tween', duration: 0.8 }}
                    className="flex mr-4 items-center justify-center relative h-full w-full"
                  >
                    <h1
                      className={clsx(
                        'text-xl font-medium absolute inset-0',
                        !AIResponse ? '-top-3.5' : 'top-4'
                      )}
                    >
                      {AIResponse
                        ? AIResponse
                        : isLoading
                        ? 'Düşünüyor...'
                        : 'Konuşmaya başla...'}
                    </h1>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            <audio
              ref={audioRef}
              autoPlay
              src={`${audio}`}
              className="w-full"
            />
            <div className="flex flex-col items-center gap-4 mt-4">
              <button
                className={clsx(
                  'w-24 h-24 bg-white/80 hover:bg-white transition active:scale-90 duration-300 backdrop-blur-lg text-main p-4 rounded-full',
                  !isSupported &&
                    'cursor-not-allowed opacity-50'
                )}
                onClick={startListening}
                disabled={!isSupported || isListening}
              >
                {!isLoading ? (
                  !isListening ? (
                    <BiMicrophone size={64} />
                  ) : (
                    <BiMicrophoneOff size={64} />
                  )
                ) : (
                  <PiSparkleFill size={64} className="animate-thinking" />
                )}
              </button>

              {text && <p className="text-black">{text}</p>}
            </div>
          </>
        </div>
      </div>
    </div>
  );
}
