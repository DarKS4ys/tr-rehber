'use client';

import { Locale } from '@/i18n.config';
import { Place } from '@prisma/client';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BsStars } from 'react-icons/bs';
import { IoSendSharp } from 'react-icons/io5';
import clsx from 'clsx';
import { BiMicrophone } from 'react-icons/bi';

const endpoint =
  'https://www.stack-inference.com/run_deployed_flow?flow_id=65358cc0d838608f2b331e42&org=d6673818-2528-4c51-97d7-4d9557f9ecb1';
const apiKey = '39eada58-2eb8-4f0a-a4a9-2f099cf36d16';

export default function AIPlace({
  ai,
  place,
  lang,
}: {
  lang: Locale;
  ai: any;
  place: Place | null;
}) {
  const [inputText, setInputText] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputFocus, setInputFocus] = useState(false);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setIsSupported(false);
    }
  }, []);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async () => {
    if (inputText.trim() === '') return;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      'in-0': inputText,
      'in-1': (place?.name as { [key in Locale]: string })[lang],
      'in-2': lang,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      const fullApiResponse = response.data['out-0'];
      const cleanApiResponse = fullApiResponse.replace(/<\/?citations>/g, '');
      setApiResponse(cleanApiResponse);
    } catch (error) {
      console.error('stack-error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitCustom = async (inputText: string) => {
    if (inputText.trim() === '') return;

    const headers = {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    };

    const data = {
      'in-0': inputText,
      'in-1': (place?.name as { [key in Locale]: string })[lang],
      'in-2': lang,
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      const fullApiResponse = response.data['out-0'];
      const cleanApiResponse = fullApiResponse.replace(/<\/?citations>/g, '');
      setApiResponse(cleanApiResponse);
    } catch (error) {
      console.error('stack-error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      handleSubmit();
    }
  };

  console.log(lang);

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
      <div
        className={clsx(
          'transition shadow-[0_0px_30px_rgba(5,_5,_5,_0.3)] shadow-highlight/10 dark:shadow-primary/10 bg-background border border-border flex justify-center items-center w-full py-4 px-6 rounded-full gap-2',
          inputFocus && 'border-primary'
        )}
      >
        <BsStars
          className={clsx(
            'transition duration-200',
            !inputFocus && 'opacity-50'
          )}
          size={20}
        />
        <input
          placeholder={`${ai.placeholder} ${
            (place?.name as { [key in Locale]: string })[lang]
          }`}
          className={clsx(
            'text-primary bg-transparent transition outline-none w-full',
            inputFocus && 'placeholder:text-muted-foreground'
          )}
          value={inputText}
          onBlur={() => setInputFocus(false)}
          onFocus={() => setInputFocus(true)}
          onChange={handleInputChange}
          onKeyUp={handleKeyPress}
        />

        {isSupported && (
          <button
            onClick={startListening}
            disabled={!isSupported || isListening}
          >
            <BiMicrophone
              className={clsx(
                'text-primary hover:scale-125 transition duration-200 disabled:opcity-50 disabled:cursor-not-allowed',
                !inputFocus && 'opacity-50'
              )}
              size={24}
            />
          </button>
        )}

        <button onClick={handleSubmit}>
          <IoSendSharp
            disabled={isLoading}
            className={clsx(
              'text-primary hover:scale-125 transition duration-200 disabled:cursor-not-allowed disabled:opacity-50',
              !inputFocus && 'opacity-50'
            )}
            size={20}
          />
        </button>
      </div>

      {isLoading ? (
        <div className="border border-border p-4 w-full bg-background rounded-xl h-16">
          <div className="flex items-center justify-center">
            <div className="text-primary animate-bounce mx-1">.</div>
            <div className="text-primary animate-bounce mx-1">.</div>
            <div className="text-primary animate-bounce mx-1">.</div>
          </div>
        </div>
      ) : (
        <div
          className={`${
            apiResponse
              ? 'bg-background border border-border w-full flex'
              : 'hidden'
          } rounded-xl py-3 px-4 w-full h-full max-h-[15rem] overflow-y-auto`}
        >
          <h1>{apiResponse}</h1>
        </div>
      )}
    </div>
  );
}
