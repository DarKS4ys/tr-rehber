'use client';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiSparkles } from 'react-icons/hi';

export default function TemporaryPlayer({
  source,
  altSource,
  altTitle,
}: {
  source: string;
  altSource?: string | false | 0 | null | undefined;
  altTitle?: string;
}) {
  let options;

  if (altSource && altTitle) {
    options = [
      {
        title: 'Varsayılan',
        link: source,
      },
      {
        title: altTitle,
        link: altSource,
      },
    ];
  } else {
    options = [
      {
        title: 'Varsayılan',
        link: source,
      },
      {
        title: 'Mevcut değil',
        link: '',
      },
    ];
  }

  const [selectedOption, setSelectedOption] = useState(options[0].title);
  const [selectedOptionSRC, setSelectedOptionSRC] = useState(options[0].link);

  const handleChange = (newOption: string, newOptionSrc: string) => {
    setSelectedOption(newOption);
    setSelectedOptionSRC(newOptionSrc)
  };

  return (
    <div className="items-center flex flex-col gap-y-3  ">
      <div className="p-2 flex gap-x-3 bg-sky-200/50 relative w-fit rounded-full">
        <div className="absolute rotate-[20deg] items-center shadow-lg gap-x-1 flex -top-4 -right-5 px-3 py-2 text-xs bg-highlight text-white font-medium rounded-xl">
          <HiSparkles />
          <h3>Beta</h3>
        </div>
        {options.map((option, i) => (
          <Option
            altOptionsAvailable={!!(altTitle && altSource)}
            handleChange={handleChange}
            title={option.title}
            src={option.link}
            selectedOption={selectedOption || ''}
            key={i}
          />
        ))}
      </div>
      <iframe
        className="object-cover md:w-[70%] lg:w-[50%] rounded-lg mx-auto"
        width="100%"
        height="400"
        src={selectedOptionSRC}
        title="AI video player"
        allow="encrypted-media; fullscreen;"
      ></iframe>
    </div>
  );
}

export function Option({
  title,
  src,
  handleChange,
  selectedOption,
  altOptionsAvailable,
}: {
  selectedOption: string;
  src: string
  handleChange: (newOption: string, newOptionSrc: string) => void;
  title: string;
  altOptionsAvailable: boolean;
}) {
  return (
    <button
      disabled={title != selectedOption && !altOptionsAvailable}
      onClick={() => handleChange(title, src)}
      className={cn(
        'disabled:cursor-not-allowed group disabled:opacity-50 font-medium transition hover:text-primary text-primary/80 relative rounded-full px-4 py-1',
        title === selectedOption && 'text-primary'
      )}
    >
      {title}
      {title === selectedOption && (
        <motion.span
          className="bg-sky-500 dark:bg-sky-600 dark:group-hover:bg-sky-700 group-hover:bg-sky-600 transition-colors rounded-full absolute inset-0 -z-10"
          layoutId="activeSection"
          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        />
      )}
    </button>
  );
}
