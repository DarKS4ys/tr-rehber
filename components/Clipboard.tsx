"use client"
import React, { useState } from 'react';
import { BiCopy } from 'react-icons/bi';
import { toast } from 'sonner';

const CopyToClipboardButton = ({ textToCopy, buttonText = 'Copy to Clipboard' }: { textToCopy: string, buttonText?: string }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      {toast.success("Copied to clipboard")}

      setTimeout(() => {
        setIsCopied(false);
      }, 1500);
    } catch (error) {
      console.error('Unable to copy to clipboard:', error);
    }
  };

  return (
    <button
      className={`p-6 rounded-md flex flex-col gap-2 items-center ${
        isCopied ? 'text-green-500' : 'text-white'
      }`}
      onClick={handleCopyClick}
    >
        <BiCopy size={72}/>
      {isCopied ? 'Copied!' : buttonText}
    </button>
  );
};

export default CopyToClipboardButton;
