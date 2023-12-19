"use client"

import { useEffect, useState } from 'react';
import { Button } from './ui/button';

interface TextToSpeechButtonProps {
  text: string;
  placeLocal: any
}

const TextToSpeechButton: React.FC<TextToSpeechButtonProps> = ({ text, placeLocal }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleSpeak = () => {
    if (!isSpeaking) {
      const speech = new SpeechSynthesisUtterance(text);
      setIsSpeaking(true);
      speechSynthesis.speak(speech);

      speech.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Cleanup the speech synthesis on component unmount
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  return (
    <Button onClick={handleSpeak} key={"Text to speech button"}>
      {isSpeaking ? placeLocal.ttsStop : placeLocal.tts}
    </Button>
  );
};

export default TextToSpeechButton;