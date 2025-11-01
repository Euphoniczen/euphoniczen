'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import './playlistCardsStyle.css';
import Rating from '@mui/material/Rating';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import WhatshotOutlinedIcon from '@mui/icons-material/WhatshotOutlined';
import { PrettoSlider } from '../../slider/slider';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DOMPurify from 'dompurify';
import he from 'he';
import { Dispatch, SetStateAction, useRef } from 'react';
import SaveIcon from '@mui/icons-material/Save';
import axios from 'axios';
import { useSession } from "next-auth/react"

interface PlaylistCardProps {
  imageUrl?: string;
  playlistName?: string;
  curatorName?: string;
  trackCount?: number;
  followers?: number;
  description?: string;
  copied?: string;
  engagementRatio?: number;
  popularity?: number;
  playlistLink?: string;
  cardStylingPassed?: string;
  onClickWord?: (word: string) => void;
  storePlaylistButton?: () => void;
  showStoreButton?: boolean;
  lastUpdated?: any;
}

const PlaylistCards = ({
  imageUrl = 'https://th.bing.com/th/id/OIP.I4X_ilJ5O8dMg1yrVXovmQHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  playlistName = 'Playlist Name',
  curatorName = 'Curator Name',
  trackCount = 100,
  followers = 100000,
  description = 'Default Description.',
  engagementRatio = 1800,
  popularity = 3,
  playlistLink = '#',
  cardStylingPassed = '',
  copied = '',
  onClickWord = () => {},
  storePlaylistButton,
  showStoreButton = true,
  lastUpdated

}: PlaylistCardProps) => {
  

  const [fetchSavedPlaylists, setFetchSavedPlaylists] = useState<any[]>([]); 
  const [isDisabled, setIsDisabled] = useState(true)
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const { data: session } = useSession()

  const handleSaveClick = () => {
    if (storePlaylistButton) storePlaylistButton();
    setShowSavedMessage(true);
  };
    

    useEffect(() => {
      axios
        .get("/api/get-spotify-stored-playlists")
        .then((response) => {
            console.log("Saved playlists data:", response.data.sptfyPlaylists);
            setFetchSavedPlaylists(response.data.sptfyPlaylists);
        })
        .catch((error) => {
          console.error("There was an error", error);
        })
      }, []);
  

  const keywordRegex =
    /submit|submission|send( |-|_)?(your|ur)( |-|_)?track|demo|upload|@|email|gmail|contact|message|inbox|instagram|twitter|facebook|reddit|discord|outlook|yahoo/gi;

  const sanitizedDescription = DOMPurify.sanitize(description);
  const decoded = he.decode(sanitizedDescription);

  const renderDescription = () => {
    if (!decoded) return null;

    const containsHTML = /<\/?[a-z][\s\S]*>/i.test(decoded);

    if (containsHTML) {
      return (
        <div
          dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(decoded) }}
          style={{ color: 'inherit', cursor: 'text' }}
        />
      );
    }

    const segments = decoded.split(/(\s+)/); // Keep spaces

    return segments.map((segment: any, index: any) => {
      if (/\s+/.test(segment)) {
        return <span key={`space-${index}`}>{segment}</span>;
      }

      const isKeyword = keywordRegex.test(segment);
      const isLink = segment.startsWith('http://') || segment.startsWith('https://');

      if (isLink) {
        return (
          <a
            key={`link-${index}`}
            href={segment}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: 'var(--kindaOrange)', textDecoration: 'underline' }}
          >
            {segment}
          </a>
        );
      }

      return (
        <span
          key={`word-${index}`}
          className={`word ${isKeyword ? 'highlight-keyword' : ''}`}
          onClick={() => onClickWord(segment)}
          style={{ cursor: 'pointer' }}
        >
          {segment}
        </span>
      );
    });
  };

  return (
    <div id="playlistCardsMaster">
      <div className="playlistCard_content">
      {/* This button will store playlist data from playlistSearch */}
      {showStoreButton && (
        <div className='savePlaylistIcon'>
          {fetchSavedPlaylists.some(
            (plst) => `https://open.spotify.com/playlist/${plst?.spotifyId}` === playlistLink
          ) || showSavedMessage ? (
            <p style={{ backgroundColor: 'var(--textColor1of1)', color: 'var(--textColor2_)', cursor: 'default' }}>
              {/* playlist saved! */}
            </p>
          ) : (
            <p onClick={handleSaveClick}>save playlist</p>
          )}
        </div>
      )}
      {/*/////////////*/}
        <div className={`Cards_container ${cardStylingPassed || ''}`}>
          <div className="imageSection_card">
            <Image src={imageUrl} width={999} height={999} alt="playlist-image" />
          </div>
          <div className="textContentSection_cards">
            <div className="Card_playlistName_and_more">
              <div className="playlistName_and_trackCount_cards">
                <p className="playListName_card">{playlistName}</p>
                <p className="trackInPlaylistTotal_card">{trackCount} tracks</p>
              </div>
              <div className="followerCount_and_description">
                <p style={{ fontSize: '15px' }} className="playListName_card">
                  {curatorName}
                </p>
                <div className="follower_count_card">
                  <PeopleOutlinedIcon />
                  <p>{followers.toLocaleString()} followers</p>
                </div>
                <div className="playlist_Description_Card" style={{ cursor: 'pointer' }}>
                  {renderDescription()}
                </div>
                {copied === 'true' && <p className="copied-text">Text copied!</p>}
              </div>
            </div>

            <div className="playlist_popularity_section_container">
              <div className="engagement_section">
                <div className='engagment-ratio-text-and-icon'>
                  <WhatshotOutlinedIcon />
                  <p>Engagement Ratio</p>
                </div>
                <div className="average_engagement">
                  <p>{engagementRatio} followers/track</p>
                </div>
              </div>

              <div className="popularity_section_line">
                <div className="thePopularity_Rating">
                  <p>Popularity</p>
                  <Rating
                    name="read-only"
                    value={popularity}
                    readOnly
                    style={{ color: 'var(--kindaOrange' }}
                  />
                </div>
                <PrettoSlider
                  value={(popularity / 5) * 100}
                  disabled
                  style={{ color: 'var(--textColor1of1)' }}
                />
              </div>

              <Link
                href={playlistLink}
                target="_blank"
                style={{ textDecoration: 'none', color: 'var(--kindaOrange)' }}
              >
                <div className="visit_playlist_link_text">
                  <OpenInNewIcon />
                  <p>Visit Playlist</p>
                </div>
              </Link>

              {/* Added at date test */}
              {/* <h3
                style={{
                  fontStyle: 'italic', 
                  fontSize: '15px', 
                  marginTop: '10px', 
                  color: 'var(--textColor2)',
                  display: session?.user?.subscriptionType === "Premium" ? "" :
                    session?.user?.subscriptionType === "Free" || 
                    !session?.user?.subscriptionType ? "none" : "none"
                }}
              >
                Last Updated:{" "}
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : "Unknown"}
              </h3> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCards;
