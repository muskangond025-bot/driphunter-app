"use client";

import React, { useState, useEffect, useRef } from "react";
import { X, Upload, ChevronDown, ArrowLeft } from "lucide-react";

interface ImageSearchDropdownProps {
  onClose: () => void;
  onBack: () => void;
  onSearch: (query: string, toastMessage?: string) => void;
}

const mockHistory = [
  { id: 1, name: "Air Jordan 1 Retro", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=150&q=80", query: "Jordan 1" },
  { id: 2, name: "Heavyweight Oversized Hoodie", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=150&q=80", query: "Hoodie" },
  { id: 3, name: "Ripstop Cargo Pants", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=150&q=80", query: "Cargo" },
];

export default function ImageSearchDropdown({ onClose, onBack, onSearch }: ImageSearchDropdownProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analyzingStatus, setAnalyzingStatus] = useState("");
  const [progress, setProgress] = useState(0);
  const [showHistory, setShowHistory] = useState(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  const resetState = () => {
    setImagePreview(null);
    setIsAnalyzing(false);
    setAnalyzingStatus("");
    setProgress(0);
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result as string);
      startAnalysis(file.name);
    };
    reader.readAsDataURL(file);
  };

  const startAnalysis = (filename: string) => {
    setIsAnalyzing(true);
    setProgress(0);
    setAnalyzingStatus("Initializing image engine...");

    const nameLower = filename.toLowerCase();
    let detectedKeyword = "streetwear";
    let matchedCategory = "Streetwear Collection";

    if (
      nameLower.includes("jordan") ||
      nameLower.includes("nike") ||
      nameLower.includes("shoe") ||
      nameLower.includes("sneaker") ||
      nameLower.includes("adidas") ||
      nameLower.includes("samba") ||
      nameLower.includes("dunk") ||
      nameLower.includes("yeezy") ||
      nameLower.includes("kicks")
    ) {
      detectedKeyword = "Sneakers";
      matchedCategory = "Sneakers & Footwear";
    } else if (
      nameLower.includes("pant") ||
      nameLower.includes("cargo") ||
      nameLower.includes("jeans") ||
      nameLower.includes("bottom") ||
      nameLower.includes("trouser")
    ) {
      detectedKeyword = "Cargo Pants";
      matchedCategory = "Cargos & Bottoms";
    } else if (
      nameLower.includes("hoodie") ||
      nameLower.includes("sweatshirt") ||
      nameLower.includes("jacket") ||
      nameLower.includes("coat") ||
      nameLower.includes("fleece")
    ) {
      detectedKeyword = "Hoodies";
      matchedCategory = "Jackets & Hoodies";
    } else if (nameLower.includes("tee") || nameLower.includes("tshirt") || nameLower.includes("shirt")) {
      detectedKeyword = "T-Shirts";
      matchedCategory = "Graphic Tees & Shirts";
    }

    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += 5;
      setProgress(currentProgress);

      if (currentProgress < 30) {
        setAnalyzingStatus("Detecting streetwear silhouettes...");
      } else if (currentProgress < 60) {
        setAnalyzingStatus("Matching color profiles and textures...");
      } else if (currentProgress < 90) {
        setAnalyzingStatus("Searching active partner archives...");
      } else {
        setAnalyzingStatus(`Perfect match found: ${matchedCategory}!`);
      }

      if (currentProgress >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setTimeout(() => {
          onSearch(detectedKeyword, `Matched from image: ${matchedCategory}`);
          onClose();
        }, 800);
      }
    }, 100);
  };

  const selectHistoryItem = (item: typeof mockHistory[0]) => {
    setImagePreview(item.image);
    setIsAnalyzing(true);
    setProgress(0);
    setAnalyzingStatus("Analyzing selected upload history...");

    let currentProgress = 0;
    progressIntervalRef.current = setInterval(() => {
      currentProgress += 10;
      setProgress(currentProgress);

      if (currentProgress < 50) {
        setAnalyzingStatus("Reading cached neural features...");
      } else {
        setAnalyzingStatus(`Matched with: ${item.name}`);
      }

      if (currentProgress >= 100) {
        if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
        setTimeout(() => {
          onSearch(item.query, `Matched from history: ${item.name}`);
          onClose();
        }, 800);
      }
    }, 120);
  };

  return (
    <div className="w-full flex flex-col text-left animate-fade-in">
      {/* Laser Scanning Line Animation */}
      <style jsx global>{`
        @keyframes inlineScan {
          0% {
            top: 0%;
          }
          50% {
            top: 100%;
          }
          100% {
            top: 0%;
          }
        }
        .animate-inline-scan-line {
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #6F4E37, transparent);
          box-shadow: 0 0 8px #6F4E37, 0 0 16px #6F4E37;
          animation: inlineScan 2s infinite linear;
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
          Search by Image
        </span>
      </div>

      {/* Dropzone / Preview */}
      {!imagePreview ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          className={`border border-dashed rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer min-h-[140px] transition-all duration-300 ${
            isDragging
              ? "border-[#6F4E37] bg-[#6F4E37]/5 scale-[0.99]"
              : "border-zinc-200 bg-zinc-50/50 hover:border-[#6F4E37] hover:bg-[#6F4E37]/5"
          }`}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*"
            className="hidden"
          />
          <Upload className="w-5 h-5 text-zinc-650 mb-2" />
          <p className="text-[10px] font-black text-zinc-950 uppercase tracking-tight text-center">
            Choose a file or drag and drop it here
          </p>
          <p className="text-[8px] text-zinc-400 font-mono mt-0.5 uppercase tracking-tight text-center">
            Max 5MB
          </p>
        </div>
      ) : (
        <div className="relative border border-zinc-200 bg-zinc-900 rounded-2xl overflow-hidden min-h-[160px] max-h-[220px] flex items-center justify-center p-1 shadow-md">
          <img
            src={imagePreview}
            alt="Preview"
            className="max-h-[210px] w-auto max-w-full object-contain rounded-xl"
          />

          {isAnalyzing && <div className="animate-inline-scan-line" />}

          {isAnalyzing && (
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[0.5px] flex flex-col items-center justify-end p-4">
              <div className="bg-white/95 backdrop-blur-md rounded-xl p-3 shadow-md max-w-xs w-full flex flex-col gap-1.5 border border-zinc-200 text-left">
                <div className="flex justify-between items-center text-[9px] font-mono font-bold text-[#6F4E37] uppercase">
                  <span className="truncate max-w-[190px]">{analyzingStatus}</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-zinc-200 h-1 rounded-full overflow-hidden">
                  <div
                    className="bg-[#6F4E37] h-full transition-all duration-100 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>
          )}

          {!isAnalyzing && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                resetState();
              }}
              className="absolute top-2.5 right-2.5 bg-white text-zinc-950 rounded-full p-1.5 border border-zinc-200 shadow-md transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      {/* History uploads */}
      <div className="mt-4">
        <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowHistory(!showHistory);
            }}
            className="flex items-center gap-1 text-[9px] font-black uppercase tracking-wider text-zinc-500 hover:text-black border-none bg-transparent cursor-pointer"
          >
            Your uploads
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-350 ${
                showHistory ? "rotate-180 text-black" : "text-zinc-400"
              }`}
            />
          </button>
          <span className="text-[8px] font-black uppercase tracking-widest text-zinc-500">
            View all
          </span>
        </div>

        <div
          className={`grid grid-cols-3 gap-2 mt-3 overflow-hidden transition-all duration-300 ease-in-out ${
            showHistory ? "max-h-[100px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {mockHistory.map((item) => (
            <div
              key={item.id}
              onClick={(e) => {
                e.stopPropagation();
                if (!isAnalyzing) selectHistoryItem(item);
              }}
              className={`flex gap-2 p-1.5 bg-zinc-50 border border-zinc-200/55 rounded-lg hover:border-[#6F4E37]/50 hover:bg-[#6F4E37]/5 cursor-pointer items-center transition-all ${
                isAnalyzing ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 object-cover rounded-md border border-zinc-200/60"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-[8px] font-bold text-zinc-950 leading-snug truncate uppercase">
                  {item.name}
                </p>
                <span className="text-[7px] text-zinc-400 font-mono tracking-tight block uppercase">
                  {item.query}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
