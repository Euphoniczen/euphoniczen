"use client";

import Image from "next/image";
import Link from "next/link";
import "./playlistCardsStyle.css";
import Rating from "@mui/material/Rating";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import WhatshotOutlinedIcon from "@mui/icons-material/WhatshotOutlined";
// import {PrettoSlider} from "@/components/slider/slider";
import {PrettoSlider} from "../../slider/slider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import DOMPurify from "dompurify"; 


interface PlaylistCardProps {
  imageUrl?: string;
  playlistName?: string;
  curatorName?: string; 
  trackCount?: number;
  followers?: number;
  description?: React.ReactNode;
  engagementRatio?: number;
  popularity?: number; 
  playlistLink?: string;

  cardStylingPassed?: string
}

const PlaylistCards = ({
  imageUrl = "https://th.bing.com/th/id/OIP.I4X_ilJ5O8dMg1yrVXovmQHaEo?w=316&h=197&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2",
  playlistName = "Playlist Name",
  curatorName = "Curator Name",
  trackCount = 100,
  followers = 100000,
  description = "Default Description.",
  engagementRatio = 1800,
  popularity = 3,
  playlistLink = "#",
  cardStylingPassed = ""
}: PlaylistCardProps) => {

  const sanitizedDescription = typeof description === "string"
  ? DOMPurify.sanitize(description)
  : "";

  return (
    <div id="playlistCardsMaster">
      <div className="playlistCard_content">
        <div  className={`Cards_container ${cardStylingPassed || ""}`}>
          <div className="imageSection_card">
            <Image
              src={imageUrl}
              width={999}
              height={999}
              alt="playlist-image"
            />
          </div>

          <div className="textContentSection_cards">
            <div className="Card_playlistName_and_more">
              <div className="playlistName_and_trackCount_cards">
                <p className="playListName_card">{playlistName}</p>
                <p className="trackInPlaylistTotal_card">{trackCount} tracks</p>
              </div>
              
              <div className="followerCount_and_description">
              <p style={{fontSize: '15px'}} className="playListName_card">{curatorName}</p>
                <div className="follower_count_card">
                  <PeopleOutlinedIcon />
                  <p>{followers.toLocaleString()} followers</p>
                </div>
                <div className="playlist_Description_Card">
                    <div dangerouslySetInnerHTML={{ __html: sanitizedDescription }}></div>
                </div>
              </div>
            </div>

            {/* Popularity Section */}
            <div className="playlist_popularity_section_container">
              <div className="engagement_section">
                <div className="engagement_section">
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
                  <Rating name="read-only" value={popularity} readOnly style={{color: 'var(--kindaOrange)'}}/>
                </div>
                <PrettoSlider
                  value={(popularity / 5) * 100}
                  disabled
                  style={{ color: "var(--kindaOrange)" }}
                />
              </div>

              <Link
                href={playlistLink}
                target="__blank"
                style={{
                  textDecoration: "none",
                  color: "var(--kindaOrange)",
                }}
              >
                <div className="visit_playlist_link_text">
                  <OpenInNewIcon />
                  <p>Visit Playlist</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlaylistCards;
