"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function StartButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>();

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "tr-TR"; // ! delete after
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      setTranscript(transcript);
    };

    recognitionRef.current.start();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(!isRecording);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  };

  // add
  const fadeInAnimationVariants = {
    // for framer motion
    initial: {
      opacity: 0,
      y: 100,
    },
    animate: (index: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.05 * index,
      },
    }),
  };

  return (
    <>
      <div className="h-44 flex items-center justify-center">
        <AnimatePresence>
          {!isRecording && (
            <motion.button
              exit={{ scaleX: 2, scaleY: 0.4, opacity: 0 }}
              initial={{ scaleY: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                damping: 17,
                stiffness: 150,
                duration: 1,
              }}
              onClick={handleToggleRecording}
              className="absolute bg-primary 
              hover:bg-primary/80 transition-color flex items-center font-bold text-3xl justify-center 
              rounded-full p-8 text-primary-foreground  aspect-square"
            >
              BAŞLA
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {isRecording && (
            <div className="flex items-center gap-x-2">
              {Array.from({ length: 5 }, (_, index) => (
                <motion.div
                  key={index}
                  custom={index}
                  variants={fadeInAnimationVariants}
                  initial="initial"
                  whileInView="animate"
                  viewport={{
                    once: true,
                  }}
                  className="bg-primary h-28 w-24 rounded-full"
                />
              ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {transcript && (
        <div className="border text-primary rounded-md p-2 mt-4">
          <p className="mb-0">{transcript}</p>
        </div>
      )}
    </>
  );
}
