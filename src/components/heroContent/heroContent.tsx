"use client"

import Image from "next/image"
import Link from "next/link"
import { useState, useEffect, useRef } from "react"
import heroContentStyle from "./heroContentStyle.module.css"
import Buttons from "../Buttons/Buttons"
import { usePathname } from "next/navigation"
import Avatar from '@mui/material/Avatar';
import Rectangle from "../rectangles/rectangles"
import Square from "../Box/box"
import Pagination from '@mui/material/Pagination';
import useScrollBackground from "../backgroundChangeHook/backgroundChange"

import SearchIcon from '@mui/icons-material/Search';
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
// import EuphoniczenAppVideo from "./assets/euphoniczen vid --gif.gif"
import EuphoniczenAppVideo from "@/public/videos/euphoniczen hero vid --mp4 version.mp4"

export default function Hero() { 

  // today's date
  const today = new Date(); 
  const dayOfTheMonth = today.getDate(); 

  const [growHeroImage, setGrowHeroImage] = useState("")
  const [marginDown, setMarginDown] = useState("")
  const pathname = usePathname(); 

  useEffect(() => { 
    const handleScroll = () => { 

      const scrollY = window.scrollY; 

      if(scrollY < 100) { 
        setGrowHeroImage(growHeroImage), setMarginDown(marginDown)
      } else if(scrollY > 100) {
        setGrowHeroImage("scale(1.4)"), setMarginDown("7%")
      } 
      // else if(scrollY > 201) {
      //   setGrowHeroImage(growHeroImage), setMarginDown(marginDown)
      // }
    }; 
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  

    return(<>
      <div id={heroContentStyle.heroContainerMaster}>
        <div className={heroContentStyle.heroContentStyle_FirstSection}>
            <div className={heroContentStyle.textContentOne_hero}>
                <h1>Search. Filter. Contact. All Things Playlists in One Place.</h1>
                <p>Effortlessly search by name, genre, or mood, then filter to find the right fit. Skip the guesswork and access submission details in seconds — all in one streamlined tool for artists, labels, musicians, etc...</p>
                
                {/* <div className={heroContentStyle.button_top_hero}>
                    <Buttons
                      buttonBorder="solid 2px var(--textColor2)"
                      buttonText="Signup"
                      linkHref="/signup"
                      buttonBackgroundColor = "var(--textColor1of1)"
                    />

                    <Buttons
                      buttonBorder="solid 2px var(--kindaWhite)"
                      buttonText="Pricing"
                      linkHref="/pricing"
                      buttonBackgroundColor = "var(--kindaOrange)"
                      textInButtonColor="var(--textColor1)"
                      buttonHoverColor="var(--textColor2)"
                    />
                </div> */}
            
            </div>
            <div style={{transform: growHeroImage, marginTop: marginDown, transition: 'all 0.3s ease'}} className={heroContentStyle.bigImageSectionOneHero}>
              {/* <Image src={EuphoniczenAppVideo} width={999} height={999} alt="hero-image"></Image> */}
            <video 
              // width="100%" --not needed as I already set the width and height in css
              // height="auto" --not needed as I already set the width and height in css
              controls={false} 
              autoPlay 
              playsInline
              muted 
              loop 
            >
              <source src="/videos/euphoniczen hero vid --mp4 version.mp4" type="video/mp4" />
               Your browser does not support the video tag.
            </video>
            </div>
        </div>

        {/* Hero Second Section */}
        <div className={heroContentStyle.heroContentStyle_Second_Section}>
          <div className={heroContentStyle.secondContentIn}>
            <h1>Euphoniczen is perfect for</h1>
            <div className={heroContentStyle.perfectForStyleInHero}>
              <Square squareClassName={heroContentStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musical Artists" squareTextP="Euphoniczen helps artists connect with curated playlists tailored to their sound. Filter by genre, mood, and more to pitch your music where it fits — no more random submissions, just smart discovery and real growth." />
              <Square squareClassName={heroContentStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Music Producers" squareTextP="Whether you're crafting lo-fi, EDM, trap, or cinematic instrumentals, Euphoniczen helps you find playlists that feature your style. Easily filter through opportunities and connect with curators who actually want what you create." />
              <Square squareClassName={heroContentStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musicians" squareTextP="From jazz and classical to acoustic sessions and experimental sounds — Euphoniczen helps composers, instrumentalists, and session musicians get heard. Discover niche playlists that highlight your work and grow your reach." />
              <Square squareClassName={heroContentStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Record Labels" squareTextP="Euphoniczen makes it easy for labels to identify potential playlist opportunities for their artists. Search by genre or playlist name, then grab contact or submission details directly from playlist descriptions" />
            </div>
          </div>
        </div>
        {/*Third Section Hero*/}
        <div className={heroContentStyle.thirdSectionHero}>
            {/*<h1>Euphoniczen</h1>*/}
            <Pagination className={heroContentStyle.Paginationul} count={31} page={dayOfTheMonth} variant="outlined"  sx={{
                                                                                '.MuiPaginationItem-root': { color: '#37393d', fontWeight: '600' }, // Color of pagination items
                                                                                '.Mui-selected': { backgroundColor: '#d27272', color: 'white'} // Color of selected item
                                                                              }}/>
            <p style={{fontWeight: '600', width: '80%', marginTop: '10px'}}>For every day that goes by, <span style={{color: 'var(--kindaOrange)'}}>Euphoniczen</span> makes it easier finding the right <span style={{color: 'var(--darkerPurple)'}}>playlists to promote your music</span>.</p>
        </div>
        {/* Fourth Section Below */}
        <div className={heroContentStyle.fourthSectionHero}>
          <h1>Euphoniczen</h1>
        </div>
      </div>
    </>)
}