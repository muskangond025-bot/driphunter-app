"use client";

import React, { useEffect, useState } from "react";
import { useLiveChat } from "@/context/LiveChatContext";
import LiveChatButton from "@/components/LiveChat/LiveChatButton";
import LiveChatPanel from "@/components/LiveChat/LiveChatPanel";

export default function LiveChatWidget() {
  const { isOpen } = useLiveChat();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <LiveChatButton />
      {isOpen && <LiveChatPanel />}
    </>
  );
}
