"use client";

import React, { useEffect, useRef } from "react";
import { useLiveChat } from "@/context/LiveChatContext";
import QuickActions from "./QuickActions";

export default function ChatMessages() {
  const { messages, isTyping } = useLiveChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTyping]);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-5 flex flex-col gap-4 bg-[#FAF8F5] dark:bg-zinc-950/50 scroll-smooth">
      {messages.map((msg, index) => {
        const isUser = msg.sender === "user";
        
        return (
          <div
            key={msg.id}
            className={`flex flex-col max-w-[85%] ${
              isUser ? "self-end items-end" : "self-start items-start"
            } animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div
              className={`px-4 py-2.5 rounded-2xl text-[13px] md:text-sm leading-relaxed ${
                isUser
                  ? "bg-[#6F4E37] dark:bg-[#E6C280] text-white dark:text-zinc-950 rounded-br-sm"
                  : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-bl-sm shadow-sm"
              }`}
            >
              {msg.content}
            </div>
            <span className="text-[10px] text-zinc-400 mt-1 px-1">
              {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        );
      })}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex flex-col self-start items-start animate-in fade-in duration-300">
          <div className="px-4 py-3.5 rounded-2xl rounded-bl-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
            <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
          </div>
        </div>
      )}

      {/* Quick Actions (show only if last message was from assistant and not typing) */}
      {!isTyping && messages.length > 0 && messages[messages.length - 1].sender === "assistant" && (
        <QuickActions />
      )}
      
      <div ref={bottomRef} className="h-1" />
    </div>
  );
}
