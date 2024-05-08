"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { HiSparkles } from "react-icons/hi";

export default function TemporaryPlayer() {
  const [selectedOption, setSelectedOption] = useState("");

  const handleChange = (newOption: string) => {
    setSelectedOption(newOption);
  };

  const options = [
    {
      title: "seçenek 1",
      link: "https://www.youtube.com/embed/S9cmoZFJTD4?si=xFddpHJenK15maj2",
    },
    {
      title: "seçenek 2",
      link: "https://www.youtube.com/embed/Vtj05m9wpNo?si=0Pcz7YCtW-EwPnn2",
    },
    
  ];

  const selectedOptionLink = options.find(
    (option) => option.title === selectedOption
  )?.link;

  return (
    <div className="items-center flex flex-col gap-y-3  ">
      <div className="p-2 flex gap-x-3 bg-sky-200/50 relative w-fit rounded-full">
        <div className="absolute rotate-[20deg] items-center shadow-lg gap-x-1 flex -top-5 -right-6 px-3 py-2 text-sm bg-highlight text-white font-medium border rounded-xl">
            <HiSparkles/>
            <h3>Beta</h3>
        </div>
        {options.map((option, i) => (
          <Option
            handleChange={handleChange}
            title={option.title}
            selectedOption={selectedOption}
            key={i}
          />
        ))}
      </div>
      <iframe
        className="object-cover md:w-[70%] lg:w-[50%] rounded-lg mx-auto"
        width="100%"
        height="400"
        src={selectedOptionLink}
        title="AI video player"
        allow="encrypted-media; fullscreen;"
      ></iframe>
    </div>
  );
}

export function Option({
  title,
  handleChange,
  selectedOption,
}: {
  selectedOption: string;
  handleChange: (newOption: string) => void;
  title: string;
}) {
  return (
    <button
      onClick={() => handleChange(title)}
      className={cn(
        "font-medium transition hover:text-primary text-primary/80 relative rounded-full px-4 py-1",
        title === selectedOption && "text-primary"
      )}
    >
      {title}
      {title === selectedOption && (
        <motion.span
          className="bg-sky-500/50 rounded-full absolute inset-0 -z-10"
          layoutId="activeSection"
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        ></motion.span>
      )}
    </button>
  );
}
