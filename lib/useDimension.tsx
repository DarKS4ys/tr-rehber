import { useLayoutEffect, useState } from 'react';

const useDimension = () => {
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const updateDimension = () => {
    const { innerWidth, innerHeight } = window;
    setDimension({ width: innerWidth, height: innerHeight });
  };

  useLayoutEffect(() => {
    // Immediately update dimensions when the component is mounted
    updateDimension();
    
    // Add an event listener to keep the dimensions updated
    window.addEventListener('resize', updateDimension);
    
    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener('resize', updateDimension);
    };
  }, []);

  return dimension;
};

export default useDimension;
