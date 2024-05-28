"use client";

import React, { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

export default function StartButton() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [transcript, setTranscript] = useState("");

  const recognitionRef = useRef<any>()

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [])

  const startRecording = () => {
    setIsRecording(true);
    recognitionRef.current = new window.webkitSpeechRecognition()
    recognitionRef.current.continuous = true
    recognitionRef.current.interimResults = true
    recognitionRef.current.lang = 'tr-TR'; // ! delete after
    recognitionRef.current.onresult = (event: any) => {
      const {transcript} = event.results[event.results.length - 1][0]
      setTranscript(transcript)
    }

    recognitionRef.current.start()
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsRecording(!isRecording);
      
    }
  };

  const handleToggleRecording = () => {
    setIsRecording(!isRecording)
    if (!isRecording) {
      startRecording()
    } else {
      stopRecording()
    }
  }

  return (
    <>
      <button onClick={handleToggleRecording} className="bg-primary active:scale-95 hover:scale-125 
      hover:bg-primary/80 transition duration-200 flex items-center font-bold text-3xl justify-center 
      rounded-full p-8 text-primary-foreground  aspect-square">
        {!isRecording ? 'BAŞLA' : 'KONUŞ...'}
      </button>

      {transcript && (
        <div className="border text-primary rounded-md p-2 mt-4">
          <p className="mb-0">{transcript}</p>
        </div>
      )}
    </>
  );
}
