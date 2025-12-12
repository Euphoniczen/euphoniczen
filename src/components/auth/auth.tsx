"use client"

import authStyle from "./authStyle.module.css"
import Image from "next/image"
import Link from "next/link"
import Square from "../Box/box"
import { useState } from "react"

import GoogleIcon from "./assets/google.svg"
import FacebookIcon from "./assets/facebook.svg"
import SpotifyIcon from "./assets/spotify.svg"
import DiscordIcon from "./assets/discord.svg"

import { FormEvent } from "react"
import { signIn } from "next-auth/react"
import About from "@/src/app/about/page"

interface AuthComponents { 
    authTitle?: string;
    authClickSpotify?: () => void;
    authClickGoogle?: () => void;
    authClickFacebook?: () => void;
    authClickDiscord?: () => void;
    dontHaveAnAccount_orHaveAnAccount_Link?: string; 
    dontHaveAnAccount_orHaveAnAccount_Text?: string; 
    dontHaveAnAccount_orHaveAnAccount_Tex2?: string; 

}

export default function Authenticate({
    authTitle = "Auth Title",

    authClickSpotify, 
    authClickGoogle, 
    authClickFacebook,  
    authClickDiscord,
    dontHaveAnAccount_orHaveAnAccount_Link = "#",
    dontHaveAnAccount_orHaveAnAccount_Text = "hmmmmm",
    dontHaveAnAccount_orHaveAnAccount_Tex2 = "hmmmm"
}: AuthComponents) {

    // const [email, setEmail] = useState("");

    // const resendAction = async (e: FormEvent) => {
    //     e.preventDefault();

    //     await signIn("resend", {
    //         email,
    //         callbackUrl: '/dashboard/user/0' // Redirect after successful authentication
    //     });
    // };  

    return(
        <div id={authStyle.masterContainerAuth}>
            <div className={authStyle.contentContainerAuth}>
                <div className={authStyle.leftSection_auth}>
                    <div className={authStyle.welcomeTextLeft_auth}>
                        <h2>{authTitle}</h2>
                        <p>Please enter your details</p>
                    </div>
                    {/*  */}
                    <div className={authStyle.theOtherAuthSection}>
                        {/* <div onClick={authClickSpotify} className={authStyle.spotifyAuth}>
                                <Image src={SpotifyIcon} width={25} height={25} alt="spotify-icon"></Image>
                                <p>Continue with Spotify</p>
                            </div> */}

                        <div onClick={authClickGoogle} className={authStyle.googleAuth}>
                            <Image src={GoogleIcon} width={25} height={25} alt="google-icon"></Image>
                            <p>Continue with Google</p>
                        </div>

                        <div onClick={authClickFacebook} className={authStyle.facebookAuth}>
                            <Image src={FacebookIcon} width={25} height={25} alt="facebook-icon"></Image>
                            <p>Continue with Facebook</p>
                        </div> 

                        <div onClick={authClickDiscord} className={authStyle.discordAuth}>
                            <Image src={DiscordIcon} width={25} height={25} alt="discord-icon"></Image>
                            <p>Continue with Discord</p>
                        </div> 
                    </div>
                    <div className={authStyle.toLoadEitherSignupORLoginPage}>
                        <p>{dontHaveAnAccount_orHaveAnAccount_Text} <Link style={{color: 'var(--textColor2_semi)', fontWeight: '700'}} href={dontHaveAnAccount_orHaveAnAccount_Link}>{dontHaveAnAccount_orHaveAnAccount_Tex2}</Link></p>
                    </div>
                </div>
                <div className={authStyle.rightSide_auth}>
                    <Square squareClassName={authStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musical Artists" squareTextP="Euphoniczen helps you connect with playlists that actually match your sound. Filter by genre and mood to pitch your music where it belongs. No more throwing tracks at random curators. Just smart discovery and real growth." />
                    <Square squareClassName={authStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Music Producers" squareTextP="Whether you're creating lofi, EDM, trap, or cinematic instrumentals, Euphoniczen helps you find playlists that feature your style. Filter through opportunities and connect with curators who actually want what you create." />
                    <Square squareClassName={authStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musicians" squareTextP="From jazz and classical to acoustic sessions and experimental sounds, Euphoniczen helps composers, instrumentalists, and session musicians get heard. Discover niche playlists that highlight your work and grow your reach." />
                    <Square squareClassName={authStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Record Labels" squareTextP="Euphoniczen makes it easy for labels to identify playlist opportunities for their artists. Search by genre or playlist name, then grab contact or submission details directly from playlist descriptions." />   
                </div>
            </div>
        </div>
    )
}