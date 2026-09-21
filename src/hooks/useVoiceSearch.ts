"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface UseVoiceSearchProps {
  onSearch: (query: string) => void;
}

export function useVoiceSearch({ onSearch }: UseVoiceSearchProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const stopListening = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        console.error(err);
      }
      recognitionRef.current = null;
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    setError(null);
    setTranscript("");
    setIsListening(false);

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setError("Speech recognition is not supported by your browser.");
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const currentTranscript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result) => result.transcript)
          .join("");

        setTranscript(currentTranscript);

        if (event.results[0].isFinal) {
          setIsListening(false);
          if (currentTranscript.trim()) {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            timeoutRef.current = setTimeout(() => {
              onSearch(currentTranscript.trim());
            }, 1000);
          }
        }
      };

      recognition.onerror = (event: any) => {
        console.warn("Speech recognition issue:", event.error);
        
        if (event.error === "not-allowed") {
          setError("Microphone access denied. Please allow in browser settings.");
        } else if (event.error === "no-speech") {
          setError("No speech was detected.");
        } else {
          setError(`Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (e: any) {
      setError("Failed to initialize speech recognition.");
      console.error(e);
    }
  }, [onSearch]);

  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  return {
    isListening,
    transcript,
    error,
    startListening,
    stopListening
  };
}
