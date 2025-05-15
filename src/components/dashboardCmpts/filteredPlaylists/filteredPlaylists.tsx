"use client"

import { useEffect, useState } from "react"
import PlaylistCards from "../playlistCards/playlistCards"
import "./filteredPlaylistsStyle.css"
import HighlightMatch from "./highlightMatch"

interface PlaylistFilter_Interface {
  playlists: any[]; // Add this if not already in your prop types
  filterDescription: string;
  autoWidth?: React.CSSProperties;
  inputFilterHeading?: React.CSSProperties;
}

export default function FilteredPlaylists({
  playlists,
  filterDescription,
  autoWidth,
  inputFilterHeading,
}: PlaylistFilter_Interface) {
  const [filtered, setFiltered] = useState<any[]>([])

  useEffect(() => {
    if (!playlists) return

    const newFiltered = playlists.filter((playlist) => {
      const tempDiv = document.createElement("div")
      tempDiv.innerHTML = playlist?.description || ""
      const textContent = tempDiv.textContent || tempDiv.innerText || ""

      return textContent.toLowerCase().includes(filterDescription.toLowerCase())
    })

    setFiltered(newFiltered)
  }, [playlists, filterDescription])

  return (
    <div style={autoWidth} id="FilteredPlaylists_master_cont">
      <div className="filteredPlaylist_container">
        <div className="filteredPlaylists_title" style={inputFilterHeading}>
          <h1>Filtered Playlists</h1>
        </div>

        <div className="filteredPlaylists_cont_actual">
          {filtered.length > 0 ? (
            filtered.map((playlist, index) => (
              <PlaylistCards
                key={index}
                playlistName={playlist?.name}
                trackCount={playlist?.tracks?.total ?? "N/A"}
                followers={playlist?.followers?.total ?? "N/A"}
                description={
                  filterDescription
                    ? HighlightMatch(playlist?.description || "", filterDescription)
                    : playlist?.description || ""
                }
                engagementRatio={
                  playlist?.followers?.total && playlist?.tracks?.total
                    ? parseFloat(((playlist.followers.total / playlist.tracks.total) * 100).toFixed(2))
                    : 0
                }
                popularity={
                  playlist?.followers?.total && playlist?.tracks?.total
                    ? Math.min(
                        5,
                        Math.max(0, Math.log10(playlist.followers.total) - 1) +
                          Math.min(0.5, playlist.tracks.total / 100),
                      )
                    : 0
                }
                playlistLink={`https://open.spotify.com/playlist/${playlist?.id}`}
                imageUrl={playlist?.images?.[0]?.url}
                cardStylingPassed="cardStylingPassed"
              />
            ))
          ) : (
            <p style={{ padding: "1rem", fontStyle: "var(--fontFamily1)", color: "#666" }}>
              No playlists found.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
