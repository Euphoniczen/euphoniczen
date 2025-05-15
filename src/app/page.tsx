"use client"

// import Hero from "@/components/heroContent/heroContent"
import Hero from "../components/heroContent/heroContent"
import { useState, useEffect } from "react"

export default function Main() { 

  // const [backgroundChange, setBackgroundChange] = useState("")

  //     useEffect(() => { 
  //         const handleScroll = () => { 
  
  //             const scrollY = window.scrollY; 
  
  //             if(scrollY <= 1600) { 
  //                 setBackgroundChange("var(--textColor1)");
  //             } else if(scrollY >= 1600) { 
  //                 setBackgroundChange("var(--textColor2)")
  //             } 
  //         }
  
  //         window.addEventListener("scroll", handleScroll); 
  //         return () => window.removeEventListener("scroll", handleScroll)
  //     }, [])

  return(<>
       <div style={{transition: 'all 0.3s ease', color: 'var(--textColor2)'}} id="Main-Container">
        <Hero/>
    </div>
  </>)
}