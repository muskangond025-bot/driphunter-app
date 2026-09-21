"use client";

import React from "react";
import { Calendar, Clock, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const events = [
  { title: "Summer Drop Party", date: "Aug 15, 2026", time: "7:00 PM", location: "Mumbai", status: "Upcoming", color: "bg-[#6F4E37] text-white" },
  { title: "Streetwear Pop-Up", date: "Aug 22, 2026", time: "11:00 AM", location: "Delhi", status: "Registration Open", color: "bg-white text-black" },
  { title: "Archive Sale Event", date: "Sep 01, 2026", time: "10:00 AM", location: "Online", status: "Coming Soon", color: "bg-zinc-700 text-white" },
  { title: "Sneaker Convention", date: "Sep 15, 2026", time: "9:00 AM", location: "Bangalore", status: "Early Bird", color: "bg-black text-white" },
];

export default function EventsSchedule() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="bg-zinc-950 text-white py-16 border-t border-zinc-900">
      <div ref={ref} className="w-full max-w-[1600px] mx-auto px-6 sm:px-12 md:px-16 lg:px-20">
        <div
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl sm:text-5xl font-chaney-title uppercase tracking-tight">
            Live Drops & Events
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 font-mono mt-3 max-w-lg mx-auto">
            Don&apos;t miss exclusive releases, pop-ups, and community meetups
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 stagger-children ${
            isVisible ? "visible" : ""
          }`}
        >
          {events.map((ev) => (
            <div
              key={ev.title}
              className="group bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-2xl p-6 flex items-center justify-between gap-6 transition-all duration-300 cursor-pointer"
            >
              <div className="space-y-2">
                <h4 className="text-base font-bold uppercase tracking-tight group-hover:text-[#6F4E37] transition-colors">
                  {ev.title}
                </h4>
                <div className="flex flex-wrap items-center gap-4 text-[11px] font-mono text-zinc-500">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {ev.date}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    {ev.time}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5" />
                    {ev.location}
                  </span>
                </div>
              </div>
              <span className={`text-[9px] font-mono font-black uppercase tracking-widest px-3 py-1.5 rounded-full whitespace-nowrap ${ev.color}`}>
                {ev.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
