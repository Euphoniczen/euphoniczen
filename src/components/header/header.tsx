"use client"

import headerStyle from "./headerStyle.module.css"
import Link from "next/link"
import { useState } from "react"
import { usePathname } from "next/navigation"
import NoAccountsIcon from "@mui/icons-material/NoAccounts"
import { format } from "date-fns"
import MenuIcon from "@mui/icons-material/Menu"
import CloseIcon from "@mui/icons-material/Close"
import { useSession } from "next-auth/react"
import userSubscriptionData from "../../../hooks/userSubscriptionStatus"

export default function Header() {
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const pathname = usePathname()
  const [sessionIn, setSessionIn] = useState(false)
  const [changeHeaderColorScroll, setChangeHeaderColorScroll] = useState("")
  const [responsiveHeader, setResponsiveHeader] = useState(false)

  const { data: session } = useSession()
  const subscriptionStatus = userSubscriptionData()
  const today = new Date()
  const formatDate = format(today, "MMMM do, yyyy")

  const handleResponsiveHeader = () => {
    setResponsiveHeader(!responsiveHeader)
  }

  const handleLinkClick = () => {
    if (responsiveHeader) setResponsiveHeader(false)
  }

  const navLinks = [
    { label: "Home", href: "/", key: "home" },
    { label: "About", href: "/about", key: "about" },
    { label: "Contact", href: "/contact", key: "contact" },
    { label: "Pricing", href: "/pricing", key: "pricing" },
  ]

  // Hide header on dashboard or payment-success pages
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/payment-success")) {
    return null
  }

  return (
    <div id={headerStyle.masterContainerHEAD}>
      <div className={headerStyle.burgerLocationHeader}>
        <div onClick={handleResponsiveHeader}>
          {responsiveHeader ? (
            <CloseIcon style={{ width: "43px", height: "43px", color: "var(--textColor1of1)" }} />
          ) : (
            <MenuIcon style={{ width: "43px", height: "43px", color: "var(--textColor1of1)" }} />
          )}
        </div>
      </div>

      <header className={responsiveHeader ? headerStyle.open : ""} id={headerStyle.header}>
        <Link href="/">
          <h1 className={headerStyle.logo}>Euphoniczen</h1>
        </Link>

        <ul>
          {navLinks.map(({ label, href, key }) => (
            <div
              key={key}
              onMouseEnter={() => setHoveredLink(key)}
              onMouseLeave={() => setHoveredLink(null)}
              onClick={handleLinkClick}
            >
              <div>
                <Link href={href} style={{ color: pathname === href ? "var(--kindaOrange)" : "" }}>
                  {label}
                </Link>
                <div
                  className={`${headerStyle.underline} ${hoveredLink === key || pathname === href ? headerStyle.activeUnderline : ""}`}
                ></div>
              </div>
            </div>
          ))}
        </ul>

        {session ? (
          <Link
            onClick={handleLinkClick}
            style={{ textDecoration: "none", fontWeight: "600", color: "var(--textColor1of1)" }}
            href={`/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}&subscription_status=${subscriptionStatus}`}
          >
            <p
              style={pathname === "/signup" ? { backgroundColor: "var(--darkerPurple)" } : {}}
              className={headerStyle.signUpHead}
            >
              Dashboard
            </p>
          </Link>
        ) : (
          <div className={headerStyle.authSectionHead}>
            <Link
              onClick={handleLinkClick}
              style={{ textDecoration: "none", color: "var(--textColor2)" }}
              href="/login"
            >
              <p style={pathname === "/login" ? { color: "var(--kindaOrange)" } : {}} className={headerStyle.logInHead}>
                Login
              </p>
            </Link>
            <Link
              onClick={handleLinkClick}
              style={{ textDecoration: "none", color: "var(--textColor2)" }}
              href="/signup"
            >
              <p
                style={pathname === "/signup" ? { backgroundColor: "var(--darkerPurple)" } : {}}
                className={headerStyle.signUpHead}
              >
                Signup
              </p>
            </Link>
          </div>
        )}
      </header>

      <div
        className={headerStyle.userAfterAuth}
        style={sessionIn ? { display: "inherit", backgroundColor: changeHeaderColorScroll } : { display: "none" }}
      >
        <div className={headerStyle.logoutSectionHead}>
          <p className={headerStyle.logoutHead}>Logout</p>

          <div
            className={headerStyle.dashboardHead}
            onMouseEnter={() => setHoveredLink("dashboard")}
            onMouseLeave={() => setHoveredLink(null)}
            onClick={handleLinkClick}
          >
            <div style={{ fontWeight: "bold" }}>
              <Link href="/dashboard" style={{ color: pathname === "/dashboard" ? "var(--kindaOrange)" : "" }}>
                Dashboard
              </Link>
              <div
                className={`${headerStyle.underline} ${hoveredLink === "dashboard" || pathname === "/dashboard" ? headerStyle.activeUnderline : ""}`}
              ></div>
            </div>
          </div>
        </div>

        <div className={headerStyle.userAfterAuthProfileSection}>
          <p>Username</p>
          {/* <Avatar alt="User Profile" src=""> </Avatar> */}
          <NoAccountsIcon style={{ width: "35px", height: "35px" }} />
        </div>
      </div>
    </div>
  )
}