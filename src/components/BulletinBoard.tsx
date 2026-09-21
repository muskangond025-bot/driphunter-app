"use client";

import React from "react";
import { Pin, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { SectionHeading } from "@/components/ui/SectionHeading";

interface BoardNote {
  id: string;
  title: string;
  date: string;
  content: string;
  bg: string;
  text: string;
  pinColor: string;
  rotate: string;
}

const notes: BoardNote[] = [
  {
    id: "note-1",
    title: "V1 DROP SOLD OUT",
    date: "JULY 28",
    content: "The Stella Denim collection sold out in 14 minutes. We are currently processing shipments. Sign up for restock codes.",
    bg: "bg-[#f5f0eb]",
    text: "text-zinc-950",
    pinColor: "text-[#6F4E37]",
    rotate: "hover:rotate-1 rotate-[-1deg]",
  },
  {
    id: "note-2",
    title: "DESIGN PHILOSOPHY",
    date: "JULY 25",
    content: "We don't manufacture hype. We design high-weight, organic cotton basics tailored to last, bridging the gap between quality and culture.",
    bg: "bg-[#6F4E37]",
    text: "text-white",
    pinColor: "text-white",
    rotate: "hover:rotate-[-1deg] rotate-[1.5deg]",
  },
  {
    id: "note-3",
    title: "ARCHIVE ACCESS CODE",
    date: "JULY 22",
    content: "Use vault key [DRIP10] at checkout. Early access portal opens at midnight for verified community accounts.",
    bg: "bg-zinc-950",
    text: "text-white",
    pinColor: "text-[#6F4E37]",
    rotate: "hover:rotate-[2deg] rotate-[-1.5deg]",
  },
  {
    id: "note-4",
    title: "SHIPPING UPDATE",
    date: "JULY 20",
    content: "Express deliveries across all major tier-1 cities are now running 24/7. Standard dispatch times remain under 24 hours.",
    bg: "bg-white",
    text: "text-zinc-950",
    pinColor: "text-zinc-950",
    rotate: "hover:rotate-[-2deg] rotate-[0.5deg]",
  },
];

export default function BulletinBoard() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-white dark:bg-zinc-950 py-16 border-t border-zinc-100 dark:border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        
        {/* Section Header */}
        <div
          className={`mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <SectionHeading
            title="Bulletin Board"
            className="text-black"
            eyebrow={
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#6F4E37]" />
                <span className="text-[10px] font-mono text-[#6F4E37] font-extrabold uppercase tracking-widest">
                  COMMUNITY HUB
                </span>
              </div>
            }
          />
        </div>

        {/* Board Notes Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className={`relative p-8 rounded-3xl shadow-md border border-zinc-200/50 flex flex-col justify-between min-h-[260px] text-left transition-all duration-300 ${note.bg} ${note.text} ${note.rotate}`}
            >
              {/* Pushpin Decorative Icon */}
              <div className="absolute top-4 right-4 z-20">
                <Pin className={`w-4 h-4 fill-current ${note.pinColor}`} />
              </div>

              {/* Note Content */}
              <div className="space-y-4">
                <span className="text-[9px] font-mono opacity-60 tracking-wider block">
                  {note.date}
                </span>
                <h4 className="text-base font-extrabold uppercase tracking-tight font-chaney-title leading-tight">
                  {note.title}
                </h4>
                <p className="text-xs font-mono leading-relaxed opacity-80">
                  {note.content}
                </p>
              </div>

              {/* Action Link */}
              <div className="pt-6">
                <button className="inline-flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-widest hover:opacity-75 transition-opacity cursor-pointer">
                  Details
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
