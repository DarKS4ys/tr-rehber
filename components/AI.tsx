"use client"

import axios from "axios";
import React, { useState } from 'react'
import { BsStars } from 'react-icons/bs'
import { IoSendSharp } from "react-icons/io5";

const endpoint = "https://www.stack-inference.com/run_deployed_flow?flow_id=65358cc0d838608f2b331e42&org=d6673818-2528-4c51-97d7-4d9557f9ecb1";
const apiKey = "39eada58-2eb8-4f0a-a4a9-2f099cf36d16";

export default function AI() {
  const [inputText, setInputText] = useState("");
  const [apiResponse, setApiResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    };

    setIsLoading(true);

    try {
      const response = await axios.post(endpoint, data, { headers });
      setApiResponse(response.data["out-0"]);
    } catch (error) {
      console.error("stack-error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };
  return (
    <div className="flex flex-col justify-center gap-4 items-center">
        <div className="bg-background border border-border drop-shadow-xl flex justify-center items-center w-96 py-4 px-6 rounded-full gap-2">
            <BsStars className="text-[#7c7c7c]" />
            <input
                placeholder="Ask me anything"
                className="text-primary bg-transparent outline-none w-full"
                value={inputText}
                onChange={handleInputChange}
                onKeyUp={handleKeyPress}
                />
            <button onClick={handleSubmit}>
              <IoSendSharp className="text-primary hover:scale-125 transition duration-200" />  
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
              } rounded-xl py-3 px-4 w-[50%] h-40 overflow-y-scroll`}>
                <h1>{apiResponse}</h1>
            </div>
            }
      </div>      
  )
}
