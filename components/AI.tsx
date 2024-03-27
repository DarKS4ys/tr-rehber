"use client"

import axios from "axios";
import React, { useState } from 'react'
import { BsStars } from 'react-icons/bs'
import { IoSendSharp } from "react-icons/io5";
import clsx from 'clsx'
import type { Locale } from "@/i18n.config";

const endpoint = "https://www.stack-inference.com/inference/v0/run/676de3fe-f93f-4864-ba95-da9ada41ffae/66042c64e6d05ff0b99c3fa4";
const apiKey = "d0b91d28-b288-4aee-b8a7-43238e349828";

export default function AI({ai, lang}: {lang: Locale, ai: string}) {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === "") return;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const data = {
      "in-0": inputText,
      'in-2': lang,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      const fullApiResponse = response.data.outputs['out-0'];

      const cleanApiResponse = fullApiResponse.replace(/<\/?citations>/g, '');
      setApiResponse(cleanApiResponse);

    } catch (error) {
      console.error("stack-error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCustom = async (inputText: string) => {
    if (inputText.trim() === "") return;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    };

    const data = {
      "in-0": inputText,
      'in-2': lang,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      const fullApiResponse = response.data["out-0"];
      const cleanApiResponse = fullApiResponse.replace(/<\/?citations>/g, '');
      setApiResponse(cleanApiResponse);

    } catch (error) {
      console.error("stack-error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      handleSubmit();
    }
  };

  const startListening = () => {
    try {
      setIsListening(false);

      if (!('webkitSpeechRecognition' in window) || !isSupported) {
        return;
      }

      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = `${lang}-${lang.toUpperCase()}`;
      // ! maybe delete?
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        handleSubmitCustom(transcript);
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

  return (
    <div className="flex flex-col justify-center gap-4 items-center">
      <div className={clsx("transition backdrop-blur-lg border shadow-[0_0px_30px_rgba(5,_5,_5,_0.3)] shadow-white/40 dark:shadow-primary/10 border-border drop-shadow-xl flex justify-center items-center w-full py-4 px-6 rounded-full gap-2", inputFocus ? 'border-primary bg-background' : 'bg-background/90')}>
          <BsStars className={clsx('transition duration-200' , !inputFocus && 'opacity-50')} />
            <input
              placeholder={ai}
              className={clsx("text-primary bg-transparent transition outline-none w-full", inputFocus && 'placeholder:text-muted-foreground')}
              value={inputText}
              onChange={handleInputChange}
              onBlur={() => setInputFocus(false)}
              onFocus={() => setInputFocus(true)}
              onKeyUp={handleKeyPress}
              />
            <button onClick={handleSubmit}>
                          
{/*         {isSupported && (
          <button
            onClick={startListening}
            disabled={!isSupported || isListening}
          >
            <BiMicrophone
              className={clsx(
                'text-primary hover:scale-125 transition disabled:opcity-50 disabled:cursor-not-allowed',
                !inputFocus && 'opacity-50 hover:opacity-80',
              isListening && '!opacity-100 animate-mic'
              )}
              size={24}
            />
          </button>
        )} */}
            <IoSendSharp className={clsx("text-primary hover:scale-125 transition duration-200", !inputFocus && 'opacity-50' )} />
            </button>
        </div>

          {isLoading ? 
            <div className="border border-border p-4 w-full bg-background rounded-xl h-16">
              <div className="flex items-center justify-center">
                <div className="text-primary animate-bounce mx-1">.</div>
                <div className="text-primary animate-bounce mx-1">.</div>
                <div className="text-primary animate-bounce mx-1">.</div>
              </div>
            </div>
            : 
            <div className={`${
              apiResponse ? "bg-background border border-border w-full flex" : "hidden"
              } rounded-xl py-3 px-4 w-full max-w-[25rem] h-full max-h-[15rem] overflow-y-auto`}>
                <h1>{apiResponse}</h1>
            </div>
            }
      </div>      
  )
}
