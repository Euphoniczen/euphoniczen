"use client"

import { useState, useEffect } from "react"
// import Profile_AND_Setting from "@/components/dashboardCmpts/profile&settings/profile&settings"
import Profile_AND_Setting from "../../../../components/dashboardCmpts/profile&settings/profile&settings"
import dashboardStyle from "../../dashboardStyle.module.css"
// import PlaylistSearch from "@/components/dashboardCmpts/playlistSearch/playlistSearch"
import PlaylistSearch from "../../../../components/dashboardCmpts/playlistSearch/playlistSearch"
// import SettingsPopup from "@/components/settings/settings"
import SettingsPopup from "../../../../components/settings/settings"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Loading from "../../../../../loading"
import axios from "axios"
import PricingPage from "../../../../app/pricing/page"
import userSubscriptionData from "../../../../../hooks/userSubscriptionStatus"

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const subscriptionStatus = userSubscriptionData()

  const [playlists, setPlaylists] = useState([])
  const [filterDescription, setFilterDescription] = useState("")
  const [debouncedFilter, setDebouncedFilter] = useState("")
  const [gradePurple, setGradePurple] = useState(false)
  const [gradeBlack, setGradeBlack] = useState(false)
  const [gradeDefault, setGradeDefault] = useState(false)
  const [autoWidthFit, setAutoWidthFit] = useState(false)
  const [subscriptionType, setSubscriptionType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const [openSettings, setOpenSettings] = useState(false)

  useEffect(() => {
    const fetchSubscription = async () => {
      if (status === "authenticated") {
        try {
          const response = await axios.get("/api/subscription_name")
          const subType = response.data.getSubscriptionName
          setSubscriptionType(subType || "") 
        } catch (error) {
          console.error("Failed to fetch subscription type:", error)
          setSubscriptionType(null)
        } finally {
          setIsLoading(false)
        }
      } else if (status === "unauthenticated") {
        setIsLoading(false)
      }
    }

    fetchSubscription()
  }, [status])

  useEffect(() => {
    if (
      session?.user?.name &&
      session.user?.subscriptionType &&
      (subscriptionStatus === "trialing" || subscriptionStatus === "created")
    ) {
      router.replace(
        `/dashboard/user/${session.user.name}?subscription_type=${session.user.subscriptionType}&subscription_status=${subscriptionStatus}`,
      )
    }
  }, [session, router, subscriptionStatus])

  if (isLoading || status === "loading") {
    return <Loading />
  }

  if (
    status === "authenticated" &&
    (subscriptionStatus === "canceled" || subscriptionStatus === "" || subscriptionType === "")
  ) {
    return <PricingPage />
  }

  if (status === "unauthenticated") {
    router.push("/login")
    return <Loading />
  }

  // Background Color Settings
  const backgroundStyle = {
    background: "var(--textColor1of1)",
    display: "flex",
  }

  const ColorStyle = {
    color: "var(--textColor1)",
    display: "flex",
  }

  if (gradePurple) {
    backgroundStyle.background = "var(--backgroundHTML)"
  } else if (gradeBlack) {
    backgroundStyle.background = "var(--textColor2)"
    Object.assign(backgroundStyle, ColorStyle)
  } else if (gradeDefault) {
    backgroundStyle.background = backgroundStyle.background
  }

  return (
    <div>
      <div style={backgroundStyle} id={dashboardStyle.dashboardMaster}>
        <Profile_AND_Setting
          gradePurple={gradePurple}
          setGradePurple={setGradePurple}
          gradeBlack={gradeBlack}
          setGradeBlack={setGradeBlack}
          gradeDefault={gradeDefault}
          setGradeDefault={setGradeDefault}
          autoWidthFit={autoWidthFit}
          setAutoWidthFit={setAutoWidthFit}
          toggleOpenSettings={openSettings}
          setToggleOpenSettings={setOpenSettings}
        />
        <PlaylistSearch
          // playlists={playlists}
          // setPlaylists={setPlaylists}
          // filterDescription={filterDescription}
          // setFilterDescription={setFilterDescription}
          inputSearchHeading={
            gradeBlack
              ? { backgroundColor: "var(--textColor2)", boxShadow: "0px 0px 24px -14px white" }
              : gradePurple
                ? { backgroundColor: "var(--backgroundHTML)" }
                : gradeDefault
                  ? { backgroundColor: "var(--textColor1of1)" }
                  : {}
          }
          autoWidth={autoWidthFit ? { width: "50%", transition: "all 0.3s ease" } : {}}
        />
        {/* <FilteredPlaylists 
          playlists={playlists} 
          filterDescription={debouncedFilter}
          inputFilterHeading={
            gradeBlack 
              ? { backgroundColor: 'var(--textColor2)', boxShadow: '0px 0px 24px -14px white' }
              : gradePurple 
                ? { backgroundColor: 'var(--backgroundHTML)' }
                : gradeDefault 
                  ? { backgroundColor: 'var(--textColor1of1)' }
                  : {}
          }
          autoWidth={autoWidthFit ? {width: '50%', transition: 'all 0.3s ease'} : {}}
        /> */}

        {openSettings && (
          <div className={dashboardStyle.settingsPopupCont}>
            <SettingsPopup
              settingsOpen={openSettings}
              setSettingsOpen={setOpenSettings}
            />
          </div>
        )}
      </div>
    </div>
  )
}