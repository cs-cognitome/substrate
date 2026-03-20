"use client";
import { useState, useEffect } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function DecipheringText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;

    const tick = () => {
      setDisplayText(
        text.split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      iteration += 1 / 3;
    };

    interval = setInterval(tick, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className="font-mono whitespace-pre-wrap">{displayText}</span>;
}
