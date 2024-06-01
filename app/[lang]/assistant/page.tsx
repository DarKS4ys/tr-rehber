"use client";

import BorderButton from "@/components/ui/border-button";
import React, { useEffect } from "react";
import StartButton from "./start-button";
import type { Locale } from "@/i18n.config";
import { Toaster } from "sonner";

export default function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  return (
    <div className="max-w-7xl py-32 mx-auto">
      <div className="flex flex-col justify-center text-center items-center w-full">
        <BorderButton>GPT4-O DESTEKLİ</BorderButton>
        <h1 className="text-3xl font-bold mt-4 mb-8">SANAL REHBER ASİSTANI</h1>
        <StartButton lang={lang} />
      </div>

      <Toaster closeButton richColors />
    </div>
  );
}
