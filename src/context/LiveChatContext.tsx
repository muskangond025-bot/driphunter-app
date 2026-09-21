"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ChatMessage, QuickActionType, chatService } from "@/services/chatService";
import { useRouter } from "next/navigation";

interface LiveChatContextType {
  isOpen: boolean;
  isMinimized: boolean;
  messages: ChatMessage[];
  isTyping: boolean;
  unreadCount: number;
  openChat: () => void;
  closeChat: () => void;
  minimizeChat: () => void;
  sendMessage: (content: string) => Promise<void>;
  triggerQuickAction: (action: QuickActionType, label: string) => Promise<void>;
}

const LiveChatContext = createContext<LiveChatContextType | undefined>(undefined);

export function LiveChatProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [hasInitialized, setHasInitialized] = useState(false);
  const router = useRouter();

  // Initialize with welcome message only when first opened
  useEffect(() => {
    if (isOpen && !hasInitialized && messages.length === 0) {
      setHasInitialized(true);
      setMessages([
        {
          id: "msg-welcome-1",
          sender: "assistant",
          content: "Hey 👋 Welcome to DripHunter.",
          timestamp: new Date().toISOString(),
        },
        {
          id: "msg-welcome-2",
          sender: "assistant",
          content: "How can we help you today?",
          timestamp: new Date().toISOString(),
        }
      ]);
    }
  }, [isOpen, hasInitialized, messages.length]);

  const openChat = () => {
    setIsOpen(true);
    setIsMinimized(false);
    setUnreadCount(0);
  };

  const closeChat = () => {
    setIsOpen(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const addMessage = (message: Omit<ChatMessage, "id" | "timestamp">) => {
    const newMessage: ChatMessage = {
      ...message,
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
    };
    
    setMessages((prev) => [...prev, newMessage]);
    
    if ((!isOpen || isMinimized) && message.sender === "assistant") {
      setUnreadCount((prev) => prev + 1);
    }
  };

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    // Add user message immediately
    addMessage({ sender: "user", content });
    
    // Simulate assistant typing
    setIsTyping(true);
    
    try {
      const response = await chatService.processMessage(content);
      addMessage({ sender: "assistant", content: response });
    } catch (error) {
      addMessage({ sender: "assistant", content: "Looks like our support chat is temporarily unavailable." });
    } finally {
      setIsTyping(false);
    }
  };

  const triggerQuickAction = async (action: QuickActionType, label: string) => {
    // Add the user's action as a message
    addMessage({ sender: "user", content: label, isQuickAction: true });
    
    if (action === "SUPPORT_TICKET") {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        addMessage({ sender: "assistant", content: "I'll redirect you to our Support Ticket form so you can reach our team directly." });
        setTimeout(() => {
          router.push("/support/tickets");
          closeChat();
        }, 1500);
      }, 1000);
      return;
    }

    setIsTyping(true);
    try {
      const response = await chatService.processMessage(label, action);
      addMessage({ sender: "assistant", content: response });
    } catch (error) {
      addMessage({ sender: "assistant", content: "Looks like our support chat is temporarily unavailable." });
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <LiveChatContext.Provider
      value={{
        isOpen,
        isMinimized,
        messages,
        isTyping,
        unreadCount,
        openChat,
        closeChat,
        minimizeChat,
        sendMessage,
        triggerQuickAction,
      }}
    >
      {children}
    </LiveChatContext.Provider>
  );
}

export function useLiveChat() {
  const context = useContext(LiveChatContext);
  if (context === undefined) {
    throw new Error("useLiveChat must be used within a LiveChatProvider");
  }
  return context;
}
