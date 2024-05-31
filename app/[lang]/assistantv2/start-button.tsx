"use client"

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { i18n, type Locale } from "@/i18n.config";
import { cn, getLocalLanguageName } from "@/lib/utils";
import { BsChevronDown } from "react-icons/bs";
import { toast } from "sonner";
import Image from "next/image";
import AvatarImage from "@/public/Avatar.png";
import { generate } from "@/actions/assistant";
import { readStreamableValue } from "ai/rsc";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    AudioContext: any;
  }
}

export default function StartButton({ lang }: { lang: Locale }) {
  const [isRecording, setIsRecording] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState("");
  const [transcript, setTranscript] = useState("");
  const [audioData, setAudioData] = useState<number[]>(
    Array.from({ length: 5 }, () => 0)
  );
  const [selectedLanguage, setSelectedLanguage] = useState(lang);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [recordedSpeech, setRecordedSpeech] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const recognitionRef = useRef<any>();
  const audioContextRef = useRef<any>();
  const analyserRef = useRef<any>();

  useEffect(() => {
    if (isRecording) {
      setupAudio();
    } else {
      teardownAudio();
    }
  }, [isRecording]);

  useEffect(() => {
    if (selectedMicrophone) {
      // Setup audio again with the selected microphone
      teardownAudio();
      setupAudio();
    }
  }, [selectedMicrophone]);

  const convertToSystematicalLang = (lang: Locale) => {
    return `${lang.toLowerCase()}-${lang.toUpperCase()}`;
  };

  const setupAudio = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        audioContextRef.current = new window.AudioContext();
        analyserRef.current = audioContextRef.current.createAnalyser();
        const source = audioContextRef.current.createMediaStreamSource(stream);
        source.connect(analyserRef.current);
        analyserRef.current.fftSize = 256;
        const bufferLength = analyserRef.current.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        const processAudio = () => {
          analyserRef.current.getByteFrequencyData(dataArray);
          const sum = dataArray.reduce((acc, val) => acc + val, 0);
          const avg = sum / bufferLength;
          const decibels = 30 * Math.log10(avg);
          setAudioData(Array.from({ length: 5 }, () => decibels));
          requestAnimationFrame(processAudio);
        };
        processAudio();
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
        toast.error(
          "Mikrofona erişmeye çalışırken hata oluştu: " + error.message
        );
        setIsRecording(false);
      });
  };

  const teardownAudio = () => {
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
  };

  const startRecording = () => {
    setIsRecording(true);
    setTranscript("");
    setRecordedSpeech("");

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = convertToSystematicalLang(
      selectedLanguage || lang
    ); // ! delete after

    let timeoutId: NodeJS.Timeout | undefined; // Correctly define the type of timeoutId
    recognitionRef.current.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];
      setTranscript(transcript);

      // Set a 2-second timeout

      if (timeoutId !== undefined) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        stopAndSaveRecording(transcript); // Execute saveandstoprecording() function after 2 seconds
      }, 1750);
    };

    recognitionRef.current.start();
  };

  const stopAndSaveRecording = (predefinedTranscript?: string) => {
    setRecordedSpeech(predefinedTranscript || transcript);
    handleRespond(predefinedTranscript || transcript)
    stopRecording();
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording);
    if (!isRecording) {
      startRecording();
    } else {
      stopAndSaveRecording();
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
        delay: 0.1 * index,
      },
    }),
  };

  const handleLanguageSelect = (chosenLanguage: Locale) => {
    if (!isRecording) {
      setSelectedLanguage(chosenLanguage);
      if (recognitionRef.current) {
        // Ensure recognitionRef.current is not undefined
        recognitionRef.current.lang = convertToSystematicalLang(chosenLanguage);
      }
    }
  };

  // framer motion manual animate function
  const startButtonHoverAnimate = useAnimation();

  const handleRespond = async (input: string) => {
    const { output } = await generate(input);

    for await (const delta of readStreamableValue(output)) {
      setResponse((currentGeneration) => `${currentGeneration}${delta}`);
    }
  };

  useEffect(() => {
    if (isButtonHovered) {
      startButtonHoverAnimate.start({
        y: 20, // Adjust this value according to your needs
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 150,
          duration: 1,
        },
      });
    } else {
      startButtonHoverAnimate.start({
        y: 0,
        transition: {
          type: "spring",
          damping: 12,
          stiffness: 150,
          duration: 1,
        },
      });
    }
  }, [isButtonHovered, startButtonHoverAnimate]);

  return (
    <>
      <div className="h-44 flex items-center justify-center">
        <AnimatePresence>
          {!recordedSpeech && !isRecording && (
            <motion.button
              exit={{ scaleX: 2, scaleY: 0.4, opacity: 0 }}
              initial={{ scaleY: 1 }}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              transition={{
                type: "spring",
                damping: 12,
                stiffness: 150,
                duration: 1,
              }}
              onClick={handleToggleRecording}
              className="absolute bg-primary 
              hover:bg-primary/80 transition-color flex items-center font-bold text-3xl justify-center 
              rounded-full w-48 overflow-hidden text-primary-foreground  aspect-square"
              onHoverStart={() => setIsButtonHovered(true)}
              onHoverEnd={() => setIsButtonHovered(false)}
              onTap={() => setIsButtonHovered(false)}
            >
              <Image
                alt="Avatar"
                placeholder="blur"
                className="drop-shadow-lg "
                src={AvatarImage}
              />
            </motion.button>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!recordedSpeech && isRecording && (
            <div className="flex items-center gap-x-2">
              {audioData &&
                audioData.map((db, index) => (
                  <motion.div
                    key={index}
                    custom={index}
                    variants={fadeInAnimationVariants}
                    initial="initial"
                    whileInView="animate"
                    exit={{ scaleY: 0, scaleX: 0.5, opacity: 0 }}
                    viewport={{
                      once: true,
                    }}
                    style={{
                      minHeight: "100px",
                      height: `${Math.max(db * 3.5, 0)}px`, // Ensure height is not negative
                    }}
                    className="bg-primary h-28 w-24 rounded-full"
                  />
                ))}
            </div>
          )}
        </AnimatePresence>
      </div>

      {!recordedSpeech && isRecording && transcript && (
        <div className="border text-primary rounded-md p-2 mt-4">
          <p className="mb-0">{transcript}</p>
        </div>
      )}

      <p>{response}</p>

      <AnimatePresence>
        {recordedSpeech && !isRecording && (
          <motion.button
            exit={{ scaleX: 2, scaleY: 0.4, opacity: 0 }}
            initial={{ scaleY: 1 }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{
              type: "spring",
              damping: 12,
              stiffness: 150,
              duration: 1,
            }}
            onClick={handleToggleRecording}
            className="absolute bg-primary 
              hover:bg-primary/80 transition-color flex items-center font-bold text-2xl justify-center 
              rounded-full w-40 text-primary-foreground aspect-square animate-thinking2"
            onHoverStart={() => setIsButtonHovered(true)}
            onHoverEnd={() => setIsButtonHovered(false)}
            onTap={() => setIsButtonHovered(false)}
          ></motion.button>
        )}
      </AnimatePresence>

      <button onClick={() => stopAndSaveRecording()}>debug</button>

      <motion.div animate={startButtonHoverAnimate}>
        <DropdownMenu onOpenChange={() => setDropdownOpen(!dropdownOpen)}>
          <DropdownMenuTrigger className="mt-4" asChild>
            <Button disabled={isRecording} className="group gap-x-2">
              {getLocalLanguageName(selectedLanguage, lang)}{" "}
              <BsChevronDown
                className={cn(
                  "group-hover:rotate-45 transition duration-200",
                  dropdownOpen ? "rotate-0" : "rotate-180"
                )}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel className="text-center">
              konuşma dilini seçin
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="grid grid-cols-2 3xl:grid-cols-1">
              {i18n.locales.map((locale) => (
                <DropdownMenuItem
                  onSelect={() => handleLanguageSelect(locale)}
                  className="group"
                >
                  {getLocalLanguageName(locale, selectedLanguage)}
                </DropdownMenuItem>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    </>
  );
}
