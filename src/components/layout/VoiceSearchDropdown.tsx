"use client";

import React, { useState, useEffect, useRef } from "react";
import { Mic, ArrowLeft, RotateCcw, AlertCircle } from "lucide-react";

interface VoiceSearchDropdownProps {
  onClose: () => void;
  onBack: () => void;
  onSearch: (query: string) => void;
}

export default function VoiceSearchDropdown({ onClose, onBack, onSearch }: VoiceSearchDropdownProps) {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    startListening();

    return () => {
      stopListening();
    };
  }, []);

  const startListening = () => {
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
              onClose();
            }, 1000);
          }
        }
      };

      recognition.onerror = (event: any) => {
        // Use console.warn instead of console.error to prevent Next.js dev overlay from crashing
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
  };

  const stopListening = () => {
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
  };

  return (
    <div className="w-full flex flex-col items-center py-2 text-center animate-fade-in">
      {/* Sound wave ripple animations */}
      <style jsx global>{`
        @keyframes inlineRipple {
          0% {
            transform: scale(0.9);
            opacity: 0.6;
          }
          100% {
            transform: scale(1.8);
            opacity: 0;
          }
        }
        .animate-inline-ripple-1 {
          animation: inlineRipple 2s infinite ease-out;
        }
        .animate-inline-ripple-2 {
          animation: inlineRipple 2s infinite ease-out 0.6s;
        }
      `}</style>

      {/* Header controls inside dropdown */}
      <div className="w-full flex items-center justify-between mb-4 pb-2 border-b border-zinc-100">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onBack();
          }}
          className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-zinc-500 hover:text-black border-none bg-transparent cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to trending
        </button>
        <span className="text-[9px] font-mono tracking-widest text-[#6F4E37] uppercase font-bold">
          Voice Search
        </span>
      </div>

      {/* Voice Soundwave UI */}
      <div className="relative my-4 flex items-center justify-center w-28 h-28">
        {isListening && (
          <>
            <div className="absolute inset-0 rounded-full bg-[#6F4E37]/15 border border-[#6F4E37]/10 animate-inline-ripple-1" />
            <div className="absolute inset-0 rounded-full bg-[#6F4E37]/15 border border-[#6F4E37]/10 animate-inline-ripple-2" />
          </>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            isListening ? stopListening() : startListening();
          }}
          className={`relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-none cursor-pointer transition-all duration-300 shadow-md ${
            isListening
              ? "bg-[#6F4E37] text-white hover:bg-[#5C3D2E]"
              : "bg-zinc-100 text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          <Mic className={`w-6 h-6 ${isListening ? "animate-pulse" : ""}`} />
        </button>
      </div>

      {/* Real-time transcription */}
      <div className="w-full min-h-[48px] flex items-center justify-center px-4">
        {error ? (
          <div className="flex flex-col items-center gap-1.5 text-red-500 text-[10px] font-bold font-mono">
            <div className="flex items-center gap-1 justify-center">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              <span>{error}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                startListening();
              }}
              className="mt-1 text-[9px] uppercase tracking-wider font-black text-[#6F4E37] flex items-center gap-1 hover:text-[#5C3D2E] border-none bg-transparent cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Retry
            </button>
          </div>
        ) : transcript ? (
          <p className="text-zinc-800 text-xs font-semibold italic max-w-xs break-words line-clamp-2">
            "{transcript}"
          </p>
        ) : isListening ? (
          <div className="flex flex-col items-center gap-0.5">
            <span className="text-[9px] text-[#6F4E37] font-mono uppercase tracking-widest animate-pulse font-black">
              Listening...
            </span>
            <p className="text-[10px] text-zinc-400 italic">Say something like "Samba OG"</p>
          </div>
        ) : (
          <p className="text-zinc-400 text-[10px] font-mono">Click mic button to start voice search</p>
        )}
      </div>
    </div>
  );
}
