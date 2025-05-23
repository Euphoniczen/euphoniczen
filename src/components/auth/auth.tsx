"use client"

import authStyle from "./authStyle.module.css"
import Image from "next/image"
import Link from "next/link"
import Square from "../Box/box"
import { useState } from "react"

import GoogleIcon from "./assets/google.svg"
import FacebookIcon from "./assets/facebook.svg"
import SpotifyIcon from "./assets/spotify.svg"
import { FormEvent } from "react"
import { signIn } from "next-auth/react"

interface AuthComponents { 
    authTitle?: string;
    authClickSpotify?: () => void;
    authClickGoogle?: () => void;
    authClickFacebook?: () => void;
    dontHaveAnAccount_orHaveAnAccount_Link?: string; 
    dontHaveAnAccount_orHaveAnAccount_Text?: string; 
    dontHaveAnAccount_orHaveAnAccount_Tex2?: string; 

}

export default function Authenticate({
    authTitle = "Auth Title",

    authClickSpotify, 
    authClickGoogle, 
    authClickFacebook,  
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
                    {/* <form onSubmit={resendAction}  className={authStyle.authWithEmail}>
                        <input  
                             type="email" 
                             id="email-resend" 
                             name="email"
                             placeholder="Enter Your Email"
                             value={email} 
                             onChange={(e) => setEmail(e.target.value)} >
                        </input>
                        <button type="submit" value="Signin with Resend">Continue</button>
                    </form> */}
                    {/* <div className={authStyle.theOrpartLine_auth}>
                        <div className={authStyle.lineforORAuth}></div>
                        <p>OR</p>
                        <div className={authStyle.lineforORAuth}></div>
                    </div> */}
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
                    </div>
                    <div className={authStyle.toLoadEitherSignupORLoginPage}>
                        <p>{dontHaveAnAccount_orHaveAnAccount_Text} <Link style={{color: 'var(--kindaWhite)', fontWeight: '700'}} href={dontHaveAnAccount_orHaveAnAccount_Link}>{dontHaveAnAccount_orHaveAnAccount_Tex2}</Link></p>
                    </div>
                </div>
                <div className={authStyle.rightSide_auth}>
                    <Square squareClassName={authStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musical Artists" squareTextP="Euphoniczen helps artists connect with curated playlists tailored to their sound. Filter by genre, mood, and more to pitch your music where it fits — no more random submissions, just smart discovery and real growth." />
                    <Square squareClassName={authStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Music Producers" squareTextP="Whether you're crafting lo-fi, EDM, trap, or cinematic instrumentals, Euphoniczen helps you find playlists that feature your style. Easily filter through opportunities and connect with curators who actually want what you create." />
                    <Square squareClassName={authStyle.squareClassName} squareBackgroundColor="var(--darkerPurple)" squareTextColor="var(--textColor1)" squareText="Musicians" squareTextP="From jazz and classical to acoustic sessions and experimental sounds — Euphoniczen helps composers, instrumentalists, and session musicians get heard. Discover niche playlists that highlight your work and grow your reach." />
                    <Square squareClassName={authStyle.squareClassName} squareTextColor="var(--textColor1)" squareText="Record Labels" squareTextP="Euphoniczen makes it easy for labels to identify potential playlist opportunities for their artists. Search by genre or playlist name, then grab contact or submission details directly from playlist descriptions" />
                </div>
            </div>
        </div>
    )
}