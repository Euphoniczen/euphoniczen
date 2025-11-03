"use client";

import "./playlist-grid-style.css";
import Rating from "@mui/material/Rating";
import DOMPurify from "dompurify";
import he from "he";
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from "axios";

interface Playlist {
  id: string;
  imageUrl?: string;
  playlistName?: string;
  curatorName?: string;
  trackCount?: number | string;
  followers?: number | string;
  description?: string;
  engagementRatio?: number;
  popularity?: number;
  playlistLink?: string;
  storePlaylistButton?: () => Promise<void>; // Make it async
  showStoreButton?: boolean;
  lastUpdated?: any;
}

interface PlaylistGridProps {
  playlists: Playlist[];
  acceptDynamicRegex?: RegExp; 
}

export default function PlaylistGrid({ playlists = [], acceptDynamicRegex }: PlaylistGridProps) {
  const [copiedItem, setCopiedItem] = useState<string | null>(null);
  const [fetchSavedPlaylists, setFetchSavedPlaylists] = useState<any[]>([]);
  const [savingPlaylistId, setSavingPlaylistId] = useState<string | null>(null);

  // Load saved playlists from backend
  const getSavedPlaylists = async () => {
    try {
      const response = await axios.get("/api/get-spotify-stored-playlists");
      setFetchSavedPlaylists(response.data.sptfyPlaylists || []);
    } catch (error) {
      console.error("Error fetching saved playlists:", error);
    }
  };

  useEffect(() => {
    getSavedPlaylists();
  }, []);

  // Detect potential contact info
  const contactRegex = acceptDynamicRegex; 

  const processDescription = (description?: string) => {
    if (!description)
      return { cleanText: "", contactMatches: [] as string[] };
    const sanitized = DOMPurify.sanitize(description);
    const decoded = he.decode(sanitized);
    const contactMatches = decoded.match(contactRegex) || [];
    const cleanedText = decoded.replace(contactRegex, "").trim();
    return { cleanText: cleanedText, contactMatches };
  };

  // Copy contact text
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedItem(text);
      setTimeout(() => setCopiedItem(null), 1500);
    });
  };

  // Render contact info
  const renderContactInfo = (contacts: string[]) => {
    if (contacts.length === 0)
      return <span style={{ opacity: 0.6 }}>N/A</span>;
    return (
      <div
        className="contact-info"
        style={{ display: "inline-flex", gap: "8px", whiteSpace: "nowrap" }}
      >
        {contacts.map((contact, i) => {
          const isLink = contact.startsWith("http");
          const isEmail = contact.includes("@") && !contact.startsWith("@");

          if (isLink) {
            return (
              <a
                key={i}
                href={contact}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--kindaOrange)" }}
              >
                {contact}
              </a>
            );
          }

          if (isEmail) {
            return (
              <a
                key={i}
                href={`mailto:${contact}`}
                style={{ color: "var(--kindaOrange)" }}
              >
                {contact}
              </a>
            );
          }

          return (
            <span
              key={i}
              style={{
                color: "var(--kindaOrange)",
                cursor: "pointer",
                position: "relative",
              }}
              onClick={() => handleCopy(contact)}
              title="Click to copy"
            >
              {contact}
              {copiedItem === contact && (
                <span
                  style={{
                    position: "absolute",
                    top: "-20px",
                    left: "0",
                    fontSize: "10px",
                    background: "var(--darkerPurple)",
                    color: "#fff",
                    padding: "2px 4px",
                    borderRadius: "4px",
                  }}
                >
                  Copied!
                </span>
              )}
            </span>
          );
        })}
      </div>
    );
  };

  // Format last updated date
  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Handle playlist save in real time
  const handleSavePlaylist = async (playlist: Playlist) => {
    if (!playlist.storePlaylistButton) return;
    setSavingPlaylistId(playlist.id);
    try {
      await playlist.storePlaylistButton();
      await getSavedPlaylists(); // Refresh list immediately
    } catch (error) {
      console.error("Error saving playlist:", error);
    } finally {
      setSavingPlaylistId(null);
    }
  };

  return (
    <div className="playlist-container">
      <div className="playlist-table-container">
        <table className="playlist-table">
          <thead>
            <tr>
              <th>Cover</th>
              <th>Playlist Name</th>
              <th>Tracks</th>
              <th>Creator</th>
              <th>Followers</th>
              <th>Contact Info</th>
              <th>
                Engagement <br /> Ratio
              </th>
              <th>Rating</th>
              <th>Last Updated</th>
              <th>Playlist Link</th>
              <th>Save Playlist</th>
            </tr>
          </thead>
          <tbody>
            {playlists.map((playlist, index) => {
              const { cleanText, contactMatches } = processDescription(
                playlist.description
              );

              const isAlreadySaved = fetchSavedPlaylists.some(
                (plst) =>
                  `https://open.spotify.com/playlist/${plst?.spotifyId}` ===
                  playlist.playlistLink
              );

              const isSaving = savingPlaylistId === playlist.id;

              return (
                <tr key={playlist.id || index}>
                  <td>
                    <img
                      src={playlist.imageUrl || "/placeholder.svg"}
                      alt={playlist.playlistName}
                      className="playlist-cover"
                    />
                  </td>
                  <td className="playlist-name">{playlist.playlistName}</td>
                  <td>{playlist.trackCount}</td>
                  <td>{playlist.curatorName}</td>
                  <td>{playlist.followers}</td>
                  <td className="playlist-contact">
                    {renderContactInfo(contactMatches)}
                  </td>
                  <td>{playlist.engagementRatio}</td>
                  <td className="playlist-rating">
                    <Rating
                      name="read-only"
                      value={
                        playlist.popularity && playlist.engagementRatio
                          ? Math.max(
                              1,
                              playlist.popularity / playlist.engagementRatio
                            )
                          : 1
                      }
                      readOnly
                      style={{
                        color: "var(--darkerPurple)",
                        fontSize: "1.2rem",
                      }}
                    />
                  </td>
                  <td className="last-updated-playlist-grid">
                    {formatDate(playlist.lastUpdated) || "N/A"}
                  </td>
                  <td>
                    <a
                      href={playlist.playlistLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button type="button" className="playlist-visit-btn">
                        Visit PL
                      </button>
                    </a>
                  </td>
                  <td>
                    {playlist.showStoreButton && (
                      <div>
                        {isAlreadySaved ? (
                          <button
                            type="button"
                            className="playlist-saved-btn-disabled"
                            disabled
                          >
                            PL Saved!
                          </button>
                        ) : isSaving ? (
                          <button
                            type="button"
                            className="playlist-saved-btn-disabled"
                            disabled
                          >
                            Saving...
                          </button>
                        ) : (
                          <button
                            type="button"
                            className="playlist-save-btn"
                            onClick={() => handleSavePlaylist(playlist)}
                          >
                            Save PL
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}