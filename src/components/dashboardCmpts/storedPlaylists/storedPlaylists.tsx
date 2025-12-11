"use client"

import { useState, useEffect, useRef } from "react"
import axios from "axios"
import PlaylistCards from "../playlistCards/playlistCards"
import "./storedPlaylistsStyle.css"
import useClipboard from '@/hooks/useClipboard'
import { BarLoader } from "react-spinners";
import { Resizable } from 're-resizable';
import PlaylistGrid from "../playlistCards/playlist-grid"
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import TableChartIcon from '@mui/icons-material/TableChart';

export default function StoredPlaylists() { 
    const [storedPlaylistData, setStoredPlaylistData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);
    const [width, setWidth] = useState(30);
    const [isResizing, setIsResizing] = useState(false);
    const [viewMode, setViewMode] = useState<'box' | 'table'>('box'); 
    const startPos = useRef(0);
    const startWidth = useRef(0); 


    // Clipboard code for the description
    const { isCopied, handleCopy } = useClipboard(); 

    const handleWordClick = (word: string, playlistId: string) => {
        const cleanWord = word.replace(/<[^>]+>/g, '').trim();
        if (cleanWord) {
            handleCopy(cleanWord, playlistId);
        }
    };

    useEffect(() => {
        setLoading(true);
        axios
            .get("/api/get-spotify-stored-playlists")
            .then((response) => {
                setStoredPlaylistData(response.data.sptfyPlaylists);
            })
            .catch((error) => {
                console.error("There was an error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);


    // Code for window resize
    const handleMouseDown = (e: any) => {
        setIsResizing(true)
        startPos.current = e.clientX
        startWidth.current = width
    }

    useEffect(() => {
        const handleMouseMove = (e: any) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startPos.current;
            const deltaPercent = (deltaX / window.innerWidth) * 100;

            setWidth(Math.max(30, Math.min(100, startWidth.current - deltaPercent)));
        };

        const handleMouseUp = () => {
            setIsResizing(false);
        };

        if (isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    // Prepare playlist data for both views
    const preparedPlaylists = storedPlaylistData.map((storedPlaylist: any, index: number) => {
        const followers = storedPlaylist?.followerCount || 0;
        const tracks = storedPlaylist?.trackCount || 0;
        const engagementRatio = followers > 0 ? ((tracks / followers) * 100).toFixed(2) : 'N/A';
        const popularity = followers > 0 
            ? Math.min(5, Math.max(0, Math.log10(followers) - 1) + Math.min(0.5, tracks / 100))
            : 0;

        return {
            spotifyId: storedPlaylist?.spotifyId,
            name: storedPlaylist?.name || "",
            curatorName: storedPlaylist?.curatorName || "",
            trackCount: tracks,
            followers: followers,
            description: storedPlaylist?.description || "",
            engagementRatio: parseFloat(engagementRatio),
            popularity: popularity,
            imageUrl: storedPlaylist?.imageUrl || "/placeholder-image.jpg",
            index
        };
    });

    return (
        <div id="storedPlaylists-master-cont" style={{ width:  `${width}%`  }}>
          <div onMouseDown={handleMouseDown} className="line-width-manager-master">
            <div className="line-width-manager"></div>
            <div className="line-width-manager2"></div>
          </div>
          <div id="storedPlaylists-2nd-master-cont">
            <div className="storedPlaylist-switch">
                <div 
                    className="switch1-sp"
                    onClick={() => setViewMode('box')}
                    style={{ 
                        cursor: 'pointer',
                        color: viewMode === 'box' ? 'var(--darkerPurple)' : '',
                        // opacity: viewMode === 'box' ? 1 : 0.6
                    }}
                >
                    {/* <ViewColumnIcon/> */}
                    CRD
                </div>
                <div 
                    className="switch2-sp"
                    onClick={() => setViewMode('table')}
                    style={{ 
                        cursor: 'pointer',
                        color: viewMode === 'table' ? 'var(--darkerPurple)' : '',
                        // opacity: viewMode === 'table' ? 1 : 0.6
                    }}
                >
                    {/* <TableChartIcon/> */}
                    TBL
                </div>
            </div>

            <div className="hold-stored-playlsits-container">
            {loading ? (
                <div className="storedPlaylists-content-cont">
                    <p>Loading <span>saved playlists</span></p>
                    <BarLoader
                        cssOverride={{ backgroundColor: '#d3d3d3', width: '150px', borderRadius: '10px' }}
                        color='var(--kindaOrange)'
                    />
                </div>
            ) : (
                <>
                    {/* Box View - Playlist Cards */}
                    {viewMode === 'box' && (
                        <div className="storedPlaylists-content-cont">
                            {preparedPlaylists.map((playlist) => (
                                <PlaylistCards
                                    key={playlist.spotifyId || playlist.index}
                                    playlistName={playlist.name}
                                    curatorName={playlist.curatorName}
                                    trackCount={playlist.trackCount}
                                    followers={playlist.followers}
                                    description={playlist.description}
                                    onClickWord={(word) => handleWordClick(word, playlist.spotifyId)}
                                    copied={isCopied(playlist.spotifyId).toString()}
                                    engagementRatio={playlist.engagementRatio}
                                    popularity={playlist.popularity}
                                    playlistLink={`https://open.spotify.com/playlist/${playlist.spotifyId}`}
                                    imageUrl={playlist.imageUrl}
                                />
                            ))}
                        </div>
                    )}

                    {/* Table View - Playlist Grid */}
                    {viewMode === 'table' &&  (
                        <PlaylistGrid
                            playlists={preparedPlaylists.map((playlist) => ({
                                id: playlist.spotifyId || `playlist-${playlist.index}`,
                                imageUrl: playlist.imageUrl,
                                playlistName: playlist.name || "Unnamed Playlist",
                                curatorName: playlist.curatorName || "Unknown",
                                trackCount: playlist.trackCount,
                                followers: playlist.followers,
                                description: playlist.description || "No description available",
                                engagementRatio: playlist.engagementRatio,
                                popularity: playlist.popularity,
                                playlistLink: `https://open.spotify.com/playlist/${playlist.spotifyId}`,
                                onClickWord: (word: string) => handleWordClick(word, playlist.spotifyId),
                                copied: isCopied(playlist.spotifyId).toString(),
                            }))}
                        />
                    )}
                </>
            )}
            </div>
           </div>
        </div>
    );
}