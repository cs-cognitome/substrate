"use client";
import { useState, useEffect, useRef, useCallback } from "react";

const chars = "!<>-_\\/[]{}—=+*^?#________";

export default function DecipheringText({ text, speed = 30 }: { text: string; speed?: number }) {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAnimation = useCallback(() => {
    // Clear any existing animation
    if (animationRef.current) {
      clearInterval(animationRef.current);
    }

    let iteration = 0;

    // Immediately show scrambled text
    setDisplayText(
      text.split("").map(() => chars[Math.floor(Math.random() * chars.length)]).join("")
    );

    animationRef.current = setInterval(() => {
      setDisplayText(
        text.split("")
          .map((_letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (animationRef.current) clearInterval(animationRef.current);
      }
      iteration += 1 / 3;
    }, speed);
  }, [text, speed]);

  useEffect(() => {
    startAnimation();
    return () => {
      if (animationRef.current) {
        clearInterval(animationRef.current);
      }
    };
  }, [startAnimation]);

  return <span className="font-mono whitespace-nowrap">{displayText}</span>;
}
