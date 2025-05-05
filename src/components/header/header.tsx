"use client";

import Image from "next/image";
import headerStyle from "./headerStyle.module.css";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Avatar from '@mui/material/Avatar';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { format } from 'date-fns';
import { motion } from "motion/react"
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSession } from "next-auth/react";
import Buttons from "../Buttons/Buttons";
import userSubscriptionData from "../../../hooks/userSubscriptionStatus";

export default function Header() {
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);  // Track hovered link
    const pathname = usePathname();
    const [sessionIn, setSessionIn] = useState(false)
    const [changeHeaderColorScroll, setChangeHeaderColorScroll] = useState("")
    const [responsiveHeader, setResponsiveHeader] = useState(false)

    const {data: session} = useSession()

    const today = new Date(); 
    const formatDate = format(today, 'MMMM do, yyyy')
    const subscriptionStatus = useUserSubscriptionData();

    const handleResponsiveHeader = () => { 
        setResponsiveHeader(!responsiveHeader)
    }

    // This is to hide the header for the dashboard page
    if(pathname.startsWith("/dashboard") || pathname.startsWith("/payment-success")) {
        return null
    }

    // useEffect(() => { 
    //     const handleScroll = () => { 

    //         const scrollY = window.scrollY; 

    //         if(scrollY < 100) { 
    //             setChangeHeaderColorScroll(changeHeaderColorScroll);
    //         } else if(scrollY > 100) { 
    //             setChangeHeaderColorScroll("var(--textColor1)")
    //         } 
    //     }

    //     window.addEventListener("scroll", handleScroll); 
    //     return () => window.removeEventListener("scroll", handleScroll)
    // }, [])

    const testConst = 'red'
    

    return (<div id={headerStyle.masterContainerHEAD}>
        <div className={headerStyle.burgerLocationHeader}>
          <div onClick={handleResponsiveHeader}>
            {responsiveHeader ? (
                <CloseIcon style={{width: '43px', height: '43px', color: 'var(--textColor2)'}}/>
            ): ( 
                <MenuIcon style={{width: '43px', height: '43px', color: 'var(--textColor2)'}}/>
            )}
           </div>
        </div>
            <header style={responsiveHeader ? { display: 'block'} : {}} id={headerStyle.header}>
            <Link href="/"><h1 className={headerStyle.logo}>Euphoniczen</h1></Link>

            <ul>
                <div 
                    onMouseEnter={() => setHoveredLink("home")}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div><Link href="/" style={{ color: pathname === "/" ? "var(--kindaOrange)" : "" }}>Home</Link> 
                        <div className={`${headerStyle.underline} ${hoveredLink === "home" || pathname === "/" ? headerStyle.activeUnderline : ""}`}></div></div>
                </div>

                <div 
                    onMouseEnter={() => setHoveredLink("about")}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div><Link href="/about" style={{ color: pathname === "/about" ? "var(--kindaOrange)" : "" }}>About</Link> 
                        <div className={`${headerStyle.underline} ${hoveredLink === "about" || pathname === "/about" ? headerStyle.activeUnderline : ""}`}></div></div>
                </div>

                <div 
                    onMouseEnter={() => setHoveredLink("contact")}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div><Link href="/contact" style={{ color: pathname === "/contact" ? "var(--kindaOrange)" : "" }}>Contact</Link> 
                        <div className={`${headerStyle.underline} ${hoveredLink === "contact" || pathname === "/contact" ? headerStyle.activeUnderline : ""}`}></div></div>
                </div>

                <div 
                    onMouseEnter={() => setHoveredLink("pricing")}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div><Link href="/pricing" style={{ color: pathname === "/pricing" ? "var(--kindaOrange)" : "" }}>Pricing</Link> 
                        <div className={`${headerStyle.underline} ${hoveredLink === "pricing" || pathname === "/pricing" ? headerStyle.activeUnderline : ""}`}></div></div>
                </div>
            </ul>

            {session ? (
                <>
                    <Link style={{textDecoration: 'none', fontWeight: '600', color:'var(--textColor1of1)'}} href={`/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}&subscription_status=${subscriptionStatus}`}><p style={pathname === "/signup" ? {backgroundColor: 'var(--darkerPurple)'} : {}} className={headerStyle.signUpHead}>Dashboard</p></Link>
                </>
            ) : (
                <div className={headerStyle.authSectionHead}>
                    <Link style={{textDecoration: 'none', color:'var(--textColor2)'}} href="/login"><p style={pathname === "/login" ? {color: 'var(--kindaOrange)'} : {}} className={headerStyle.logInHead}>Login</p></Link>
                    <Link style={{textDecoration: 'none', color:'var(--textColor2)'}} href="/signup"><p style={pathname === "/signup" ? {backgroundColor: 'var(--darkerPurple)'} : {}} className={headerStyle.signUpHead}>Signup</p></Link>
                </div>

            )}

        </header>
        <div className={headerStyle.userAfterAuth} style={sessionIn ? {display: 'inherit', backgroundColor: changeHeaderColorScroll} : {display: 'none'}}>
            <div className={headerStyle.logoutSectionHead}>
            {/*  */}
            <p className={headerStyle.logoutHead}>Logout</p>

                <div className={headerStyle.dashboardHead}
                    onMouseEnter={() => setHoveredLink("dashboard")}
                    onMouseLeave={() => setHoveredLink(null)}>
                    <div style={{fontWeight: "bold"}}><Link href="/dashboard" style={{ color: pathname === "/dashboard" ? "var(--kindaOrange)" : "" }}>Dashboard</Link> 
                        <div className={`${headerStyle.underline} ${hoveredLink === "dashboard" || pathname === "/dashboard" ? headerStyle.activeUnderline : ""}`}></div></div>
                </div>
            {/*  */}
            </div>

            <div className={headerStyle.userAfterAuthProfileSection}>
                <p>Username</p>
                {/* <Avatar alt="User Profile" src=""> </Avatar>   */}
                <NoAccountsIcon style={{width: '35px', height: '35px'}}/>
            </div>
        </div>
    </div>
    );
}