"use client"

import Image from "next/image"
import Link from "next/link"
import aboutStyle from "./aboutStyle.module.css"
// import Rectangle from "@/components/rectangles/rectangles"
import Rectangle from "../../components/rectangles/rectangles"

export default function About() { 

	return(<div id={aboutStyle.aboutSectionMaster}>
		<div className={aboutStyle.aboutSectionContent}>
			<div className={aboutStyle.firstSectionAbout}>
				<h1>euphoniczen</h1>
				<p>Euphoniczen is a smart, lightweight tool built for artists, producers, musicians, and labels looking to grow through playlist placements.
				  Quickly search for Spotify playlists by name, genre, or mood — and uncover submission or contact details directly from playlist descriptions. No more guesswork or manual digging — just clean, focused discovery.</p>
				<p>Playlisting remains one of the most effective ways to build recognition, boost streams, and grow a loyal fanbase. With Euphoniczen, you can stay focused on making music, while we help you find the right paths to get it heard. Whether you're just starting out or managing multiple releases, Euphoniczen gives you a simple edge in the world of playlist marketing.</p>
			</div>
			{/* <div className={aboutStyle.secondSectionAbout}>
				<Rectangle rectangleText="Search" rectangleBorder="solid 3px var(--kindaWhite)" rectangeAvatarIn rectangleBackgroundColor="var(--darkerPurple)" rectangleTextColor="var(--textColor1)"/>
				<Rectangle rectangleText="Find" rectangleBorder="solid 3px var(--kindaWhite)" rectangeAvatarIn rectangleBackgroundColor="var(--darkerPurple)" rectangleTextColor="var(--textColor1)"/>
				<Rectangle rectangleText="Query" rectangleBorder="solid 3px var(--kindaWhite)" rectangeAvatarIn rectangleBackgroundColor="var(--darkerPurple)" rectangleTextColor="var(--textColor1)"/>
				<Rectangle rectangleText="Connect" rectangleBorder="solid 3px var(--kindaWhite)" rectangeAvatarIn rectangleBackgroundColor="var(--darkerPurple)" rectangleTextColor="var(--textColor1)"/>
			</div> */}
			
			{/* Third Section --About */}
		</div>
	</div>)
}