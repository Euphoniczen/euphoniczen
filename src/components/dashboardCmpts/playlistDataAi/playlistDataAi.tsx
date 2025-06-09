"use client";

import "./playlistDataAiStyle.css";
import sanitizeHtml from "sanitize-html";
import he from "he";
import axios from "axios";
import { useState, useEffect } from "react";

interface PlaylistDataAi_Interface {
  responseData?: string;
}

function linkify(text: string): string {
  const urlRegex = /((https?:\/\/[^\s]+))/g;
  return text.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}

export default function PlaylistDataAi({ responseData }: PlaylistDataAi_Interface) {
  const [aiResult, setAiResult] = useState<string>("");

  const noLoad = "Start by clicking the click me button of any playlist card to load ai data";

  useEffect(() => {
    if (!responseData) return;

    axios.post('/api/openai', {
      dataForAi: responseData,
    })
      .then(function (response) {
        const rawText = response.data.fullAiResponseData;

        // Decode HTML entities first
        const decoded = he.decode(rawText);

        // Convert URLs to <a> tags
        const linkedText = linkify(decoded);

        // Sanitize output
        const sanitized = sanitizeHtml(linkedText, {
          allowedTags: ['a', 'b', 'i', 'em', 'strong', 'br'],
          allowedAttributes: {
            a: ['href', 'target', 'rel'],
          },
        });

        setAiResult(sanitized);
      })
      .catch(function (error) {
        console.error(error);
        setAiResult("An error occurred while processing the data.");
      });
  }, [responseData]);

  return (
    <div id="master-cont-playlistDataAi">
      {aiResult ? (
        <div dangerouslySetInnerHTML={{ __html: aiResult }} />
      ) : (
        <div>{noLoad}</div>
      )}
    </div>
  );
}