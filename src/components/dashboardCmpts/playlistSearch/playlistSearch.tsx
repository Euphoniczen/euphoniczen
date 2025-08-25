"use client"

import type React from "react"
import "./playlistSearchStyle.css"
import PlaylistCards from "../playlistCards/playlistCards"
import axios from "axios"
import { useState, useEffect } from "react"
import { playlistNames } from "./randomPlaylistNames"
import { useSession } from "next-auth/react"
import useClipboard from "@/hooks/useClipboard"
import FilterAltIcon from "@mui/icons-material/FilterAlt"
import AddIcon from "@mui/icons-material/Add"
import CloseIcon from "@mui/icons-material/Close"
import { Tooltip } from "@mui/material"
import Pagination from '@mui/material/Pagination';
import { PlaylistCalendar } from "../playlistCalendar/playlistCalendar"

interface PlaylistSearch_Interface {
  autoWidth?: React.CSSProperties
  inputSearchHeading?: React.CSSProperties
  actualInputDynamicStyling?: React.CSSProperties
  storedDataFor_handleSendPlaylistDataToAi?: any
}

export default function PlaylistSearch({
  autoWidth,
  inputSearchHeading,
  actualInputDynamicStyling,
  storedDataFor_handleSendPlaylistDataToAi,
}: PlaylistSearch_Interface) {
  const [readDocs, setReadDocs] = useState(false)
  const [searchData, setSearchData] = useState<string>("")
  const [shuffledSuggestions, setShuffledSuggestions] = useState<string[]>([])
  const [playlistData, setPlaylistData] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [introState, setIntroState] = useState(true)
  const [searchStats, setSearchStats] = useState({
    searched: 0,
    found: 0,
    skipped: 0,
    offset: 0,
    totalScanned: 0,
    searchAttempts: 0,
  })
  const [regexPopup, setRegexPopup] = useState(false)
  const [filterInput, setFilterInput] = useState<string>("")
  const [date, setDate] = useState<string>("");

  // Predefined keywords that users can manage
  const predefinedKeywords = [
    "submit",
    "submission",
    "send your track",
    "send_your_track",
    "send-your-track",
    "demo",
    "upload",
    "@",
    "email",
    "gmail",
    "contact",
    "message",
    "inbox",
    "instagram",
    "twitter",
    "facebook",
    "reddit",
    "discord",
    "outlook",
    "yahoo",
  ]

  // Initialize filterReturn with predefined keywords
  const [filterReturn, setFilterReturn] = useState<string[]>(predefinedKeywords)

  const { data: session } = useSession()
  const subscriptionStatus = session?.user?.subscriptionType

  // Create dynamic regex from selected keywords
  const createDynamicRegex = () => {
    if (filterReturn.length === 0) return null
    const escapedKeywords = filterReturn.map((keyword) => keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    return new RegExp(escapedKeywords.join("|"), "i")
  }

  useEffect(() => {
    const shuffled = [...playlistNames].sort(() => Math.random() - 0.5).slice(0, 5)
    setShuffledSuggestions(shuffled)
  }, [])

  const handleReadDocs = () => {
    setReadDocs(!readDocs)
  }

  const handleTextSuggestions = (suggestion: string) => {
    setSearchData(suggestion)
  }

  const resetSearch = () => {
    setIntroState(true)
    setPlaylistData([])
    setSearchStats({
      searched: 0,
      found: 0,
      skipped: 0,
      offset: 0,
      totalScanned: 0,
      searchAttempts: 0,
    })
  }

  const preScreenPlaylist = (playlist: any) => {
    if (!playlist || !playlist.id || !playlist.name || !playlist.images || playlist.images.length === 0) {
      return false
    }

    if (playlist.description) {
      const dynamicRegex = createDynamicRegex()
      return dynamicRegex ? dynamicRegex.test(playlist.description) : false
    }

    return false
  }

  const fetchPlaylistDetails = async (playlist: any, accessToken: string) => {
    if (!playlist?.id) return null

    try {
      const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlist.id}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      })

      const detail = response.data
      const dynamicRegex = createDynamicRegex()

      if (
        detail?.description &&
        dynamicRegex &&
        dynamicRegex.test(detail.description) &&
        detail?.images?.length > 0 &&
        detail?.owner?.display_name
      ) {
        return detail
      }

      return null
    } catch (error) {
      console.error(`Error fetching playlist ${playlist.id}:`, error)
      return null
    }
  }

  const getPlaylist = async (event: React.FormEvent) => {
    event.preventDefault()
    setLoading(true)
    setPlaylistData([])
    setIntroState(false)

    let currentOffset = 0
    const limit = 50
    const targetMatchCount = 50
    let allFilteredPlaylists: any[] = []
    let totalProcessed = 0
    let searchAttempts = 0
    const maxSearchAttempts =
      session?.user?.subscriptionType === "Extra Premium" ? 20 : session?.user?.subscriptionType === "Premium" ? 10 : 0

    setSearchStats({
      searched: 0,
      found: 0,
      skipped: 0,
      offset: currentOffset,
      totalScanned: 0,
      searchAttempts: 0,
    })

    try {
      const tokenRes = await fetch("/api/spotify_authentication", { method: "POST" })
      const { access_token } = await tokenRes.json()

      if (!access_token) {
        console.error("Failed to obtain access token")
        setLoading(false)
        return
      }

      while (allFilteredPlaylists.length < targetMatchCount && searchAttempts < Number(maxSearchAttempts)) {
        searchAttempts++

        setSearchStats((prev) => ({
          ...prev,
          searchAttempts,
        }))

        const searchResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchData)}&type=playlist&limit=${limit}&offset=${currentOffset}`,
          { headers: { Authorization: `Bearer ${access_token}` } },
        )

        const playlists = searchResponse.data?.playlists?.items || []

        if (playlists.length === 0) {
          break
        }

        totalProcessed += playlists.length

        setSearchStats((prev) => ({
          ...prev,
          searched: prev.searched + playlists.length,
          offset: currentOffset,
          totalScanned: totalProcessed,
        }))

        const playlistsWithMatchingDescriptions = []
        const playlistsNeedingDetails = []

        for (const playlist of playlists) {
          if (preScreenPlaylist(playlist)) {
            playlistsNeedingDetails.push(playlist)
          } else {
            setSearchStats((prev) => ({
              ...prev,
              skipped: prev.skipped + 1,
            }))
          }
        }

        const batchSize = 5

        for (
          let i = 0;
          i < playlistsNeedingDetails.length && allFilteredPlaylists.length < targetMatchCount;
          i += batchSize
        ) {
          const batch = playlistsNeedingDetails.slice(i, i + batchSize)

          const batchPromises = batch.map((playlist: { id: string }) => fetchPlaylistDetails(playlist, access_token))
          const batchResults = await Promise.all(batchPromises)

          const validResults = batchResults.filter(Boolean)

          const skippedInThisIteration = batch.length - validResults.length

          allFilteredPlaylists = [...allFilteredPlaylists, ...validResults]
          setPlaylistData(allFilteredPlaylists.slice(0, targetMatchCount))

          setSearchStats((prev) => ({
            ...prev,
            found: allFilteredPlaylists.length,
            skipped: prev.skipped + skippedInThisIteration,
          }))
        }

        currentOffset += limit
      }

      setSearchData("")
    } catch (error) {
      console.error("Error searching playlists:", error)
    } finally {
      setLoading(false)
    }
  }

  // Stored Playlist function
  const handleStoringPlaylists = (playlist: any) => {
    axios
      .post("/api/spotify-playlist-data", {
        spotifyData: playlist,
      })
      .then((response) => {
        console.log(response.data)
      })
      .catch((error) => {
        console.error("error storing playlist:", error)
      })
  }

  // Clipboard Hook --to copy data from description
  const { isCopied, handleCopy } = useClipboard()

  const handleWordClick = (word: string, playlistId: string) => {
    const cleanWord = word.replace(/<[^>]+>/g, "").trim()
    if (cleanWord) {
      handleCopy(cleanWord, playlistId)
    }
  }

  // Reset to default keywords
  const resetToDefaultKeywords = () => {
    setFilterReturn([...predefinedKeywords])
  }

  // Clear all keywords
  const clearAllKeywords = () => {
    setFilterReturn([])
  }

  return (
    <div style={autoWidth} id="playlistSearchMaster">
      <form onSubmit={getPlaylist} className="playlistSearch_container_content">
        <div className="inputSearch" style={inputSearchHeading}>
          <p className="inputSearch_title">
            Find playlists that match your style.{" "}
            <span
              onClick={handleReadDocs}
              style={{
                color: "var(--kindaOrange)",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Read Docs
            </span>
          </p>

          {readDocs && (
            <div className="readDocs_content" onClick={handleReadDocs}>
              <p style={{ fontWeight: "500" }}>
                Begin by entering specific playlist titles, themes or music genres such as "rap music 2025," "whisper
                beats for thin walls," "my 2am thoughts but make it chill," or "hip-hop/rap, pop" in the search bar and
                then press the search button to generate results. Our innovation filtering tool identifies playlists
                inviting submissions by looking for highlighted cues including "@gmail," "submit," "insta,"
                "submissions," and others, hours faster than manual searching. Each result presents instant contact
                details about playlist curators, from where you can make an inquiry regarding submission procedures and
                guidelines. Euphoniczen is designed specifically to maximize the playlist discovery process for
                independent artists, music producers, musicians, & record labels.
                <span style={{ fontWeight: "600", padding: "0px 3px" }}>
                  Euphoniczen will automatically search across multiple pages to find up to 50 playlists accepting
                  submissions.
                </span>
                <span style={{ display: "block", padding: "10px 0px", color: "var(--textColor2)" }}>
                  You can customize which keywords to filter by using the filter button. Add or remove keywords to match
                  your specific needs. Current active keywords:{" "}
                  <span style={{ fontWeight: "600", color: "var(--darkerPurple)" }}>{filterReturn.join(", ")}</span>
                </span>
                <span
                  onClick={handleReadDocs}
                  style={{
                    color: "var(--kindaOrange)",
                    cursor: "pointer",
                    fontWeight: "800",
                  }}
                >
                  Close
                </span>
              </p>
            </div>
          )}

          <div className="search_field_input">
            <div className="full-input-field">
              <input
                style={actualInputDynamicStyling}
                type="text"
                placeholder="Search for playlist names — e.g. 'Rap Music 2025', 'Lofi Sleep', and more"
                value={searchData}
                onChange={(event) => setSearchData(event.target.value)}
              />
              <div className="search_buttons">
                <button
                  style={actualInputDynamicStyling}
                  disabled={!searchData.trim() || loading || filterReturn.length === 0}
                  className={`${!searchData.trim() || loading || filterReturn.length === 0 ? "disableButtonStyle" : ""}`}
                  type="submit"
                >
                  {loading ? "Searching..." : "Search"}
                </button>
              </div>
            </div>
            {/* Filter Button */}
            {subscriptionStatus === 'Extra Premium' ? ( 
            <div>
              {regexPopup ? (
                <div className="filterPopup-filter-overlay">
                  <div className="filterPopup-filter">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <h2 style={{ textDecoration: "underline", margin: 0 }}>Manage Keywords</h2>
                      <CloseIcon
                        onClick={() => setRegexPopup(false)}
                        style={{ color: "var(--textColor2)", cursor: "pointer" }}
                      />
                    </div>

                    <p style={{ fontSize: "14px", color: "var(--textColor2)", marginBottom: "15px" }}>
                      Active keywords: {filterReturn.length} | These keywords will be used to filter playlists
                    </p>

                    <div className="filterInput-container">
                      <input
                        placeholder="Add new keyword to filter"
                        type="text"
                        value={filterInput}
                        onChange={(event) => setFilterInput(event.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault()
                            const trimmedInput = filterInput.trim().toLowerCase()
                            if (trimmedInput && !filterReturn.includes(trimmedInput)) {
                              setFilterReturn([...filterReturn, trimmedInput])
                              setFilterInput("")
                            }
                          }
                        }}
                      />
                      <button
                        onClick={() => {
                          const trimmedInput = filterInput.trim().toLowerCase()
                          if (trimmedInput && !filterReturn.includes(trimmedInput)) {
                            setFilterReturn([...filterReturn, trimmedInput])
                            setFilterInput("")
                          }
                        }}
                        type="button"
                        disabled={!filterInput.trim()}
                      >
                        Add
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "10px", margin: "15px 0px" }}>
                      <button
                        type="button"
                        onClick={resetToDefaultKeywords}
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          backgroundColor: "var(--kindaOrange)",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Reset to Default
                      </button>
                      <button
                        type="button"
                        onClick={clearAllKeywords}
                        style={{
                          padding: "5px 10px",
                          fontSize: "12px",
                          backgroundColor: "var(--textColor2)",
                          color: "white",
                          border: "none",
                          borderRadius: "4px",
                          cursor: "pointer",
                        }}
                      >
                        Clear All
                      </button>
                    </div>

                    <div className="all-saved-filters">
                      {filterReturn.length === 0 ? (
                        <p
                          style={{
                            color: "var(--textColor2)",
                            fontStyle: "italic",
                            textAlign: "center",
                            padding: "20px",
                          }}
                        >
                          No keywords selected. Add keywords above or reset to default.
                        </p>

                        // 
                      ) : (
                        filterReturn.map((fR, index) => (
                          <div key={index} className="each-keyword-regex">
                            <p>{fR}</p>
                            <CloseIcon
                              style={{ width: "18px", height: "18px", cursor: "pointer" }}
                              onClick={() => {
                                setFilterReturn(filterReturn.filter((_, i) => i !== index))
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>

                    {/* Fetch playlists based on when it updates */}
                    {/* <div className="playlistCalendar_master_cont_in_palylistSearch"
                      style={{
                        marginTop: '6%',
                      }}
                    >
                    <div
                      style={{}}
                    >
                      <h2 style={{textDecoration: 'underline'}}>Manage Playlist Activity</h2>
                      <p style={{marginTop: '5px'}}>Select a date range based on when tracks were last added to find active or inactive playlists.</p>
                        <PlaylistCalendar
                          date={date}
                          setDate={setDate}
                        />
                      </div>
                    </div> */}
                  {/* //// */}
                  </div>
                </div>
              ) : (
                <div className="filter-regex" onClick={() => setRegexPopup(true)}>
                  {/* <AddIcon style={{ width: "20px", height: "20px", color: "var(--textColor2)" }} /> */}
                  <FilterAltIcon style={{ width: "20px", height: "20px", color: "var(--textColor2)" }} />
                  <span style={{ fontSize: "12px", color: "var(--textColor2)", fontWeight: '600' }}>
                    ({filterReturn.length})
                  </span>
                </div>
              )}
            </div>
            ) : ( 
              <div>
                <Tooltip 
                  title="Upgrade to Extra Premium to customize keywords" 
                >
                <div className="filter-regex" style={{backgroundColor: 'var(--kindaDark)'}}>
                  <FilterAltIcon style={{ width: "20px", height: "20px", color: "var(--textColor2)" }} />
                  <span style={{ fontSize: "12px", color: "var(--textColor2)", fontWeight: '600' }}>
                    (n/a)
                  </span>
                </div>

                </Tooltip>
              </div>
            )}
            {/*  */}
          </div>

          {/* Search Stats */}
          {!introState && !loading && (
            <div className="search_stats">
              <p>
                Pages: {searchStats.searchAttempts} | Checked: {searchStats.totalScanned} playlists | Found:{" "}
                <span className="highlight_count">{searchStats.found}</span> matches | Invalid: {searchStats.skipped}{" "}
                playlists
              </p>
            </div>
          )}

          {/* Loading Indicator */}
          {loading && (
            <div className="loading_indicator">
              <div className="loading_bar">
                <div
                  className="loading_progress"
                  style={{
                    width: `${Math.min(100, (searchStats.found / 50) * 100)}%`,
                  }}
                ></div>
              </div>
              <p>
                Searching page {searchStats.searchAttempts}, scanned {searchStats.totalScanned} playlists so far...
              </p>
              {searchStats.found > 0 && (
                <p className="loading_found">Found {searchStats.found}/50 matching playlists</p>
              )}
            </div>
          )}
        </div>

        {/* Cards Section */}
        {introState ? (
          <div className="loadingIntro_search">
            <p style={{ fontSize: "17px" }}>
              Start by typing playlist names in the search above or use some of our playlist name suggestions
            </p>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                marginTop: "10px",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {shuffledSuggestions.map((suggestion, index) => (
                <span
                  key={index}
                  onClick={() => handleTextSuggestions(suggestion)}
                  style={{
                    backgroundColor: "var(--backgroundHTML)",
                    padding: "3px 7px",
                    borderRadius: "6px",
                    border: "solid 2px var(--kindaWhite)",
                    cursor: "pointer",
                    margin: "4px",
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className="card_section_mapped_data">
            {playlistData.length === 0 && !loading && (
              <div className="no_results">
                <p>No playlists matched your search criteria.</p>
                <p className="no_results_tip">
                  Try using broader keywords like "indie" or "hip hop" for better results, or adjust your filter
                  keywords.
                </p>
                <button
                  onClick={resetSearch}
                  className="try_again_button"
                  style={{
                    backgroundColor: "var(--kindaOrange)",
                    color: "white",
                    padding: "8px 16px",
                    borderRadius: "4px",
                    border: "none",
                    marginTop: "10px",
                    cursor: "pointer",
                  }}
                >
                  Try Different Search
                </button>
              </div>
            )}

            {playlistData.map((playlist, index) => {
              // Skip if critical data is missing
              if (!playlist?.id || !playlist?.name || !playlist?.images?.[0]?.url) {
                return null
              }

              // Calculating engagement ratio
              const followers = playlist?.followers?.total || 0
              const tracks = playlist?.tracks?.total || 0
              const engagementRatio = followers > 0 ? ((tracks / followers) * 100).toFixed(2) : "N/A"

              // Calculating popularity score
              const popularity =
                followers > 0 ? Math.min(5, Math.max(0, Math.log10(followers) - 1) + Math.min(0.5, tracks / 100)) : 0

              return (
                <PlaylistCards
                  key={`${playlist.id}-${index}`}
                  showStoreButton={
                    subscriptionStatus === "Extra Premium" ? true : subscriptionStatus === "Premium" ? false : undefined
                  }
                  playlistName={playlist?.name || "Unnamed Playlist"}
                  curatorName={playlist.owner?.display_name || "Unknown"}
                  trackCount={tracks || "N/A"}
                  followers={followers || "N/A"}
                  description={playlist?.description || "No description available"}
                  onClickWord={(word) => handleWordClick(word, playlist.id)}
                  copied={isCopied(playlist.id).toString()}
                  engagementRatio={Number.parseFloat(engagementRatio)}
                  popularity={popularity}
                  playlistLink={`https://open.spotify.com/playlist/${playlist?.id}`}
                  imageUrl={playlist?.images?.[0]?.url || "/placeholder-image.jpg"}
                  storePlaylistButton={() => handleStoringPlaylists(playlist)}
                />
              )
            })}
          </div>
        )}
      </form>
    </div>
  )
}