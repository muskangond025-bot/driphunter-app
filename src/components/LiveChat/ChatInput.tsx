"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { useLiveChat } from "@/context/LiveChatContext";

export default function ChatInput() {
  const [content, setContent] = useState("");
  const { sendMessage, isTyping } = useLiveChat();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [content]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!content.trim() || isTyping) return;
    sendMessage(content);
    setContent("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 md:p-4 bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 rounded-b-2xl md:rounded-b-3xl shrink-0">
      <form onSubmit={handleSend} className="relative flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={isTyping}
          rows={1}
          className="flex-1 max-h-[120px] min-h-[44px] py-3 px-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm resize-none focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 disabled:opacity-50"
        />
        <button
          type="submit"
          disabled={!content.trim() || isTyping}
          className="flex items-center justify-center w-11 h-11 shrink-0 rounded-full bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-offset-zinc-950"
          aria-label="Send message"
        >
          <Send className="w-4 h-4 ml-0.5" />
        </button>
      </form>
    </div>
  );
}
