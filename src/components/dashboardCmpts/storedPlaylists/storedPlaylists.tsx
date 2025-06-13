"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import PlaylistCards from "../playlistCards/playlistCards"
import "./storedPlaylistsStyle.css"
import useClipboard from '@/hooks/useClipboard'
import { BarLoader } from "react-spinners";

export default function StoredPlaylists() { 
    const [storedPlaylistData, setStoredPlaylistData] = useState<any[]>([]); 
    const [loading, setLoading] = useState(true);

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
                setStoredPlaylistData(response.data.playlistStored);
            })
            .catch((error) => {
                console.error("There was an error", error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <div id="storedPlaylists-master-cont">
            <div className="storedPlaylists-content-cont">
                {loading ? (
                    <>
                        <p>Loading <span>saved playlists</span></p>
                        <BarLoader
                            cssOverride={{ backgroundColor: '#d3d3d3', width: '150px', borderRadius: '10px' }}
                            color='var(--kindaOrange)'
                        />
                    </>
                ) : (
                    storedPlaylistData.map((storedPlaylist: any, index: number) => {
                        // Calculating engagement ratio
                        const followers = storedPlaylist?.storedSpotifyPayload?.followers?.total || 0;
                        const tracks = storedPlaylist?.storedSpotifyPayload?.tracks?.total || 0;
                        const engagementRatio = followers > 0 ? ((tracks / followers) * 100).toFixed(2) : 'N/A';

                        // Calculating popularity score
                        const popularity = followers > 0 
                            ? Math.min(5, Math.max(0, Math.log10(followers) - 1) + Math.min(0.5, tracks / 100))
                            : 0;

                        return (
                            <PlaylistCards
                                // showStoreButton={false}
                                key={storedPlaylist?.storedSpotifyPayload?.id || index}
                                playlistName={storedPlaylist?.storedSpotifyPayload?.name || ""}
                                curatorName={storedPlaylist?.storedSpotifyPayload?.owner?.display_name || ""}
                                trackCount={tracks}
                                followers={followers}
                                description={storedPlaylist?.storedSpotifyPayload?.description || ""}
                                onClickWord={(word) => handleWordClick(word, storedPlaylist?.storedSpotifyPayload.id)}
                                copied={isCopied(storedPlaylist?.storedSpotifyPayload?.id).toString()}
                                engagementRatio={parseFloat(engagementRatio)}
                                popularity={popularity}
                                playlistLink={`https://open.spotify.com/playlist/${storedPlaylist?.storedSpotifyPayload?.id}`}
                                imageUrl={storedPlaylist?.storedSpotifyPayload?.images?.[0]?.url || "/placeholder-image.jpg"}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}