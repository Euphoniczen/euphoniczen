"use client";
import { useState } from "react";

export default function useClipboard() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (textToCopy: string, playlistId: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(playlistId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch(error) {
      console.error("Failed to copy text", error);
    }
  }

  const isCopied = (playlistId: string) => copiedId === playlistId;

  return { isCopied, handleCopy };
}