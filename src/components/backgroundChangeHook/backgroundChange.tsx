// hooks/useScrollBackground.ts
"use client";

import { useState, useEffect } from "react";

interface ChangeBackgroundColor { 
  threshold?: number;
  backgroundColorFrom?: string;
  backgroundColorTo?: string;
  ColorFrom?: string; 
  ColorTo?: string; 
}

export default function useScrollBackground({
  threshold = 1600, 
  backgroundColorFrom = "white",
  backgroundColorTo = "black",
  ColorFrom = "black",
  ColorTo = "white",
}: ChangeBackgroundColor) {

    
  const [backgroundChange, setBackgroundChange] = useState(backgroundColorFrom);
  const [colorChange, setColorChange] = useState(ColorFrom)

  useEffect(() => {
    const handleScroll = () => {

      const scrollY = window.scrollY;

      // Change background color based on scroll position
      if (scrollY <= threshold) {
        setBackgroundChange(backgroundColorFrom),
        setColorChange(ColorFrom);
      } else {
        setBackgroundChange(backgroundColorTo), 
        setColorChange(ColorTo); 
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [backgroundColorFrom, backgroundColorTo, threshold, ColorFrom, ColorTo]);

  return {backgroundChange, colorChange}
}
