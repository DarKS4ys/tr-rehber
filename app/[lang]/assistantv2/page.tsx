import BorderButton from "@/components/ui/border-button";
import React from "react";
import StartButton from "./start-button";

export default function page() {
  return (
    <div className="max-w-7xl py-32 mx-auto">
      <div className="flex flex-col justify-center items-center w-full">
        <BorderButton>GPT4-O DESTEKLİ</BorderButton>
        <h1 className="text-3xl font-bold mt-4 mb-8">SANAL REHBER ASİSTANI</h1>
        <StartButton/>
      </div>
    </div>
  );
}
