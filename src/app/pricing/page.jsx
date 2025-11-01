"use client"

import Pricing from "../../components/pricingComponent/PricingCmpt"
import pricingPageStyle from "./pricingPageStyle.module.css"
import { useState } from "react"
import { paddlePricing } from "../../components/paddlePricing/paddlePricing"
import userSubscriptionData from "../../../hooks/userSubscriptionStatus"
// import Modal from "@/components/dialog_modal/modal"
import Modal from "../../components/dialog_modal/modal"
import { useSession } from "next-auth/react"
import Loading from "../../../loading"
import { useRouter } from "next/navigation"
import paddleCustomerId from "../../../hooks/paddleCustomerId"
import useTrackPageView from "@/hooks/useTrackPageView"

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false)
  const [isModalOpen, setModalOpen] = useState(false) 
  const customerId = paddleCustomerId(); 

  const router = useRouter()
  const { data: session, status } = useSession()

  // Facebook Pageview hook
  useTrackPageView('Pricing Page')
  

  const userSubscriptionStatus = userSubscriptionData()

  // const freeCheckoutHandler = paddlePricing({
  //   priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_FREE_FOREVER
  // })

  const premiumCheckoutHandler = paddlePricing({
    priceId: isYearly
      ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_Premium_YEARLY : process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_Premium_MONTHLY
  })

  const toggleSwitch = () => {
    setIsYearly(!isYearly)
  }

  const handleFreeClick = (e) => {
    e.preventDefault()
    if (!session) {
      router.push("/signup")
      return
    } else {
      router.push(`/dashboard/user/${session.user?.name}`)
    }
    // freeCheckoutHandler(e)

    // if (userSubscriptionStatus === "active" || userSubscriptionStatus === "trialing") {
    //   setModalOpen(true)
    // } else {
    //   freeCheckoutHandler(e)
    // }
  }

  const handlePremiumClick = (e) => {
    // e.preventDefault()
    // if (!session) {
    //   router.push("/signup")
    //   return
    // }
    premiumCheckoutHandler(e)

    // if (userSubscriptionStatus === "active" || userSubscriptionStatus === "trialing") {
    //   setModalOpen(true)
    // } else {
    //     premiumCheckoutHandler(e)
    // }
  }
  
  return (
    <div id={pricingPageStyle.pricingPageContMain}>
      <div className={pricingPageStyle.firstsectionPricing}>
        <h1>Plans & Pricing</h1>
        <div className={pricingPageStyle.textandSwitch}>
          <p>
            Choose the plan that best fits your needs and start growing your audience with <br /> Euphoniczen today.
            Transparent pricing, no hidden fees.
          </p>
          <div className={pricingPageStyle.sliderButtonPricing} onClick={toggleSwitch}>
            <div
              className={`${pricingPageStyle.switch} ${isYearly ? pricingPageStyle.yearly : pricingPageStyle.monthly}`}
            />
            <div className={pricingPageStyle.textContainer}>
              <p className={pricingPageStyle.p1Pricing} style={{ color: isYearly ? "#fff" : "#000" }}>
                Monthly
              </p>
              <p style={{ color: isYearly ? "#000" : "#fff" }}>Yearly</p>
            </div>
          </div>
        </div>
      </div>
      <div className={pricingPageStyle.pricingLists}>
        <Pricing
          pricingBackgroundColor="var(--darkerPurple)"
          pricingTextColor="var(--textColor1of1)"
          buttonBackgroundColorPricing="var(--darkerPurple)"
          buttonOnClickPricing={handleFreeClick}
          buttonTextSubscribe={"Signup"}
          price={"Free"}
          monthOrYear={"forever"}
          planName=" Free"
          pricingDescription="Start free and discover the core features available."
          inPlan1="Search up to 200 playlists per query"
          inPlan2="Get up to 50 playlist results"
          inPlan3="Randomized Query"
          inPlan4="Support"
          inPlan5="Customizable background color options"
          hideThisFeature={true}
          // trailText={`14 days free then ${isYearly ? "$30.00" : "$3"} after (for new users only)`}
        />
        <Pricing
          pricingBackgroundColor="var(--textColor2)"
          pricingTextColor="var(--textColor1of1)"
          buttonBackgroundColorPricing="var(--kindaDark)"
          buttonOnClickPricing={handlePremiumClick}
          buttonTextSubscribe={"Subscribe"}
          price={`$${isYearly ? 50 : 5}`}          
          monthOrYear={isYearly ? "Yearly󠁯 •󠁏󠁏 15% off" : "Monthly"}
          planName="Premium"
          pricingDescription="Upgrade to premium to access all features and enjoy prioritized support."
          inPlan1="Search up to 1000 playlists per query"
          inPlan2="Get up to 50 playlist results"
          inPlan3="Randomized Query"
          inPlan4="Prioritized Support"
          inPlan5="Customizable background color options"
          inPlan6="Save playlists for revisitation"
          inPlan7="Advanced Playlist Filtering with Keyword Management"
          hideExtraFeatures={false}
          inPlan8="Advanced Playlist Calendar Control"
        />
      </div>

      {isModalOpen && <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />}
    </div>
  )
}