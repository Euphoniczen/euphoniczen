'use client'

import Image from 'next/image'
import Link from 'next/link'
import './playlistSearchStyle.css'
import PlaylistCards from '../playlistCards/playlistCards'
import axios from "axios"
import { useState, useEffect } from 'react'
import { playlistNames } from './randomPlaylistNames'
import UndoIcon from '@mui/icons-material/Undo'
import { useSession } from 'next-auth/react'
import useClipboard from '@/hooks/useClipboard'

interface PlaylistSearch_Interface {
  autoWidth?: React.CSSProperties
  inputSearchHeading?: React.CSSProperties
  actualInputDynamicStyling?: React.CSSProperties
  storedDataFor_handleSendPlaylistDataToAi?: any;
}

export default function PlaylistSearch({ autoWidth, inputSearchHeading, actualInputDynamicStyling, storedDataFor_handleSendPlaylistDataToAi}: PlaylistSearch_Interface) {
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
    searchAttempts: 0
  })

  const {data: session} = useSession();

  // Keywords to filter playlists by - moved to top level for better visibility
  const keywordRegex = /submit|submission|send( |-|_)?(your|ur)( |-|_)?track|demo|upload|@|email|gmail|contact|message|inbox|instagram|twitter|facebook|reddit|discord|outlook|yahoo/i

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
      searchAttempts: 0
    })
  }

  const preScreenPlaylist = (playlist: any) => {
    if (!playlist || !playlist.id || !playlist.name || !playlist.images || playlist.images.length === 0) {
      return false
    }
    
    if (playlist.description) {
      return keywordRegex.test(playlist.description)
    }

    return false
  }

  const fetchPlaylistDetails = async (playlist: any, accessToken: string) => {
    if (!playlist?.id) return null
    
    try {
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${playlist.id}`,
        { headers: { 'Authorization': `Bearer ${accessToken}` } }
      )

      const detail = response.data
      
      if (detail?.description && keywordRegex.test(detail.description) && 
          detail?.images?.length > 0 && detail?.owner?.display_name) {
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
    const maxSearchAttempts = session?.user?.subscriptionType === "Extra Premium" ? 20 : session?.user?.subscriptionType === "Premium" ? 10 : 0
    
    setSearchStats({
      searched: 0,
      found: 0,
      skipped: 0,
      offset: currentOffset,
      totalScanned: 0,
      searchAttempts: 0
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
        
        setSearchStats(prev => ({
          ...prev,
          searchAttempts
        }))
        
        const searchResponse = await axios.get(
          `https://api.spotify.com/v1/search?q=${encodeURIComponent(searchData)}&type=playlist&limit=${limit}&offset=${currentOffset}`,
          { headers: { 'Authorization': `Bearer ${access_token}` } }
        )

        const playlists = searchResponse.data?.playlists?.items || []
        
        if (playlists.length === 0) {
          break
        }
        
        totalProcessed += playlists.length
        
        setSearchStats(prev => ({
          ...prev,
          searched: prev.searched + playlists.length,
          offset: currentOffset,
          totalScanned: totalProcessed
        }))
        
        const playlistsWithMatchingDescriptions = []
        const playlistsNeedingDetails = []
        
        for (const playlist of playlists) {
          if (preScreenPlaylist(playlist)) {

            playlistsNeedingDetails.push(playlist)
          } else {

            setSearchStats(prev => ({
              ...prev,
              skipped: prev.skipped + 1
            }))
          }
        }
        
        const batchSize = 5
        
        for (let i = 0; i < playlistsNeedingDetails.length && allFilteredPlaylists.length < targetMatchCount; i += batchSize) {
          const batch = playlistsNeedingDetails.slice(i, i + batchSize)
          
          const batchPromises = batch.map((playlist: { id: string }) => fetchPlaylistDetails(playlist, access_token))
          const batchResults = await Promise.all(batchPromises)
          
          const validResults = batchResults.filter(Boolean)
          
          const skippedInThisIteration = batch.length - validResults.length
          
          allFilteredPlaylists = [...allFilteredPlaylists, ...validResults]
          setPlaylistData(allFilteredPlaylists.slice(0, targetMatchCount))
          
          setSearchStats(prev => ({
            ...prev,
            found: allFilteredPlaylists.length,
            skipped: prev.skipped + skippedInThisIteration
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
    axios.post('/api/spotify-playlist-data', {
      spotifyData: playlist
    }) 
    .then(function(response) { 
      console.log(response.data); 
    })
    .catch(function(error) {
      console.error("error storing playlist:", error)
    })
  }

  // Clipbaord Hook --to copy data from description
  const {isCopied, handleCopy} = useClipboard(); 

  const handleWordClick = (word: string, playlistId: string) => {
    const cleanWord = word.replace(/<[^>]+>/g, '').trim();
    if (cleanWord) {
      handleCopy(cleanWord, playlistId);
    }
  };

  return (
    <div style={autoWidth} id="playlistSearchMaster">
      <form onSubmit={getPlaylist} className="playlistSearch_container_content">
        <div className="inputSearch" style={inputSearchHeading}>
          <p className="inputSearch_title">
            Find playlists that match your style.{" "}
            <span
              onClick={handleReadDocs}
              style={{
                color: 'var(--kindaOrange)',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Read Docs
            </span>
          </p>

          {readDocs && (
            <div className='readDocs_content' onClick={handleReadDocs}>
              <p style={{ fontWeight: '500' }}>
                Begin by entering specific playlist titles or music genres such as "rap music 2025," "whisper beats for thin walls," "my 2am thoughts but make it chill," or "hip-hop/rap, pop" in the search bar and then press the search button to generate results. Our innovation filtering tool identifies playlists inviting submissions by looking for highlighted cues including "@gmail," "submit," "insta," "submissions," and others, hours faster than manual searching. Each result presents instant contact details about playlist curators, from where you can make an inquiry regarding submission procedures and guidelines. Euphoniczen was designed specifically to maximize the playlist discovery process for independent artists, music producers, musicians, & record labels.
                <span style={{fontWeight: '600', padding: '0px 3px'}}>We automatically search across multiple pages to find up to 50 playlists accepting submissions.</span>
                <span style={{display: 'block', padding: '10px 0px', color: 'var(--textColor2)'}}>Current filter regex targets playlists containing keywords related to submissions and contact info, including: <span style={{fontWeight: '600', color: 'var(--darkerPurple)'}}>submit, submission, send, send_your_track, demo, upload, @, email, gmail, contact, message, inbox, instagram, twitter ,facebook, reddit, discord, outlook, yahoo</span></span>

                <span
                  onClick={handleReadDocs}
                  style={{
                    color: 'var(--kindaOrange)',
                    cursor: 'pointer',
                    // marginLeft: '4px',
                    fontWeight: '800'
                  }}
                >
                  Close
                </span>
              </p>
            </div>
          )}

          <div className="search_field_input">
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
                disabled={!searchData.trim() || loading}
                className={`${!searchData.trim() || loading ? 'disableButtonStyle' :  ""}`}
                type="submit"
              >
                {loading ? 'Searching...' : 'Search'}
              </button>
            </div>
          </div>
          
          {/* Search Stats */}
          {!introState && !loading && (
            <div className="search_stats">
              <p>
                Pages: {searchStats.searchAttempts} | 
                Checked: {searchStats.totalScanned} playlists | 
                Found: <span className="highlight_count">{searchStats.found}</span> matches | 
                Invalid: {searchStats.skipped} playlists
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
                    width: `${Math.min(100, (searchStats.found / 50) * 100)}%` 
                  }}
                ></div>
              </div>
              <p>Searching page {searchStats.searchAttempts}, scanned {searchStats.totalScanned} playlists so far...</p>
              {searchStats.found > 0 && (
                <p className="loading_found">Found {searchStats.found}/50 matching playlists</p>
              )}
            </div>
          )}
        </div>

        {/* Cards Section */}
        {introState ? (
          <div className='loadingIntro_search'>
            <p style={{ fontSize: '17px' }}>
              Start by typing playlist names in the search above or use some of our playlist name suggestions
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              marginTop: '10px',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {shuffledSuggestions.map((suggestion, index) => (
                <span
                  key={index}
                  onClick={() => handleTextSuggestions(suggestion)}
                  style={{
                    backgroundColor: 'var(--backgroundHTML)',
                    padding: '3px 7px',
                    borderRadius: '6px',
                    border: 'solid 2px var(--kindaWhite)',
                    cursor: 'pointer',
                    margin: '4px',
                  }}
                >
                  {suggestion}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div className='card_section_mapped_data'>
            {playlistData.length === 0 && !loading && (
              <div className="no_results">
                <p>No playlists matched your search criteria.</p>
                <p className="no_results_tip">
                  Try using broader keywords like "indie" or "hip hop" for better results.
                </p>
                <button 
                  onClick={resetSearch}
                  className="try_again_button"
                  style={{
                    backgroundColor: 'var(--kindaOrange)',
                    color: 'white',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    border: 'none',
                    marginTop: '10px',
                    cursor: 'pointer'
                  }}
                >
                  Try Different Search
                </button>
              </div>
            )}
            
            {playlistData.map((playlist, index) => {
              // Skip if critical data is missing
              if (!playlist?.id || !playlist?.name || !playlist?.images?.[0]?.url) {
                return null;
              }
              
              // Calculating engagement ratio
              const followers = playlist?.followers?.total || 0;
              const tracks = playlist?.tracks?.total || 0;
              const engagementRatio = followers > 0 ? ((tracks / followers) * 100).toFixed(2) : 'N/A';
              
              // Calculating popularity score
              const popularity = followers > 0 
                ? Math.min(5, Math.max(0, Math.log10(followers) - 1) + Math.min(0.5, tracks / 100))
                : 0;
                
              return (
                <PlaylistCards
                  key={`${playlist.id}-${index}`}
                  playlistName={playlist?.name || "Unnamed Playlist"}
                  curatorName={playlist.owner?.display_name || "Unknown"}
                  trackCount={tracks || 'N/A'}
                  followers={followers || 'N/A'}
                  description={playlist?.description || "No description available"}
                  onClickWord={(word) => handleWordClick(word, playlist.id)}
                  copied={isCopied(playlist.id).toString()}
                  engagementRatio={parseFloat(engagementRatio)}
                  popularity={popularity}
                  playlistLink={`https://open.spotify.com/playlist/${playlist?.id}`}
                  imageUrl={playlist?.images?.[0]?.url || "/placeholder-image.jpg"}
                  storePlaylistButton={() => handleStoringPlaylists(playlist)}
                />
              );
            })}
          </div>
        )}
      </form>
    </div>
  )
}