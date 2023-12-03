"use client"

import React, { useState, useEffect } from 'react';
import { FiLoader } from 'react-icons/fi';

const Time: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateCurrentTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');

      const formattedTime = `${hours}:${minutes}:${seconds}`;
      setCurrentTime(formattedTime);
    };

    const intervalId = setInterval(updateCurrentTime, 1000);

    // Cleanup the interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  return <div className="text-2xl">{currentTime ? currentTime : <FiLoader className="animate-spin"/>}</div>;
};

export default Time;
