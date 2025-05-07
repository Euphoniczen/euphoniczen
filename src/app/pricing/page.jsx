"use client"

import Pricing from "../../components/pricingComponent/PricingCmpt"
import pricingPageStyle from "./pricingPageStyle.module.css"
import { useState } from "react"
import { paddlePricing } from "../../components/paddlePricing/paddlePricing"
import userSubscriptionData from "../../../hooks/userSubscriptionStatus";
import Modal from "@/components/dialog_modal/modal"

export default function PricingPage() {
    const [isYearly, setIsYearly] = useState(false);
    const userSubscriptionStatus = userSubscriptionData();
    const [isModalOpen, setModalOpen] = useState(false);
    

    const premiumCheckoutHandler = paddlePricing({
      priceId: isYearly 
        ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_Premium_YEARLY
        : process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_Premium_MONTHLY
    });
    
    const extraPremiumCheckoutHandler = paddlePricing({
      priceId: isYearly 
        ? process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_EXTRA_Premium_YEARLY
        : process.env.NEXT_PUBLIC_PADDLE_PRICE_ID_EXTRA_Premium_MONTHLY
    });
    
    const toggleSwitch = () => {
      setIsYearly(!isYearly);
    };

    const handlePremiumClick = (e) => {
      e.preventDefault();
      if (userSubscriptionStatus === 'active') {
        setModalOpen(true);
      } else {
        premiumCheckoutHandler(e);
      }
    };

    const handleExtraPremiumClick = (e) => {
      e.preventDefault();
      if (userSubscriptionStatus === 'active') {
        setModalOpen(true);
      } else {
        extraPremiumCheckoutHandler(e);
      }
    };

    return (
        <div id={pricingPageStyle.pricingPageContMain}>
          <div className={pricingPageStyle.firstsectionPricing}>
            <h1>Plans & Pricing</h1>
            
            <div className={pricingPageStyle.textandSwitch}>
              <p>
                Choose the plan that best fits your needs and start growing your audience with <br/> Euphoniczen today.
                Transparent pricing, no hidden fees.
              </p>
              
              {/* Pricing Slider */}
              <div className={pricingPageStyle.sliderButtonPricing} onClick={toggleSwitch}>
                {/* Switch */}
                <div
                  className={`${pricingPageStyle.switch} ${isYearly ? pricingPageStyle.yearly : pricingPageStyle.monthly}`}
                />
                
                {/* Text Container */}
                <div className={pricingPageStyle.textContainer}>
                  <p
                    className={pricingPageStyle.p1Pricing}
                    style={{ color: isYearly ? "#fff" : "#000" }}
                  >
                    Monthly
                  </p>
                  <p style={{ color: isYearly ? "#000" : "#fff" }}>
                    Yearly
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Second Section --Pricing-container */}
          <div className={pricingPageStyle.pricingLists}>
            {/* Premium Plan */}
            <Pricing 
              pricingBackgroundColor="var(--darkerPurple)"
              pricingTextColor="var(--textColor1of1)"
              buttonBackgroundColorPricing="var(--darkerPurple)"
              buttonOnClickPricing={handlePremiumClick}
              buttonTextSubscribe="Subscribe"
              price={isYearly ? 40 : 4}
              monthOrYear={isYearly ? "Yearly󠁯 •󠁏󠁏 15% off" : "Monthly"}
              planName = " Premium"
              pricingDescription = "Upgrade to premium to access 95% of all features and enjoy prioritized support."
              inPlan1 = "Partial Access (no access to background color change feature)"
              inPlan2 = "up to 50 playlist filtered per query"             
              inPlan3="Randomized Query"
              inPlan4 = "Prioritized Support"
              trailText="7-day free trial"
            />

            {/* Extra Premium Plan */}
            <Pricing 
              pricingBackgroundColor="var(--textColor2)"
              pricingTextColor="var(--textColor1of1)"
              buttonBackgroundColorPricing="var(--kindaDark)"
              buttonOnClickPricing={handleExtraPremiumClick}
              buttonTextSubscribe="Subscribe"
              price={isYearly ? 51 : 5}
              monthOrYear={isYearly ? "Yearly󠁯 •󠁏󠁏 15% off" : "Monthly"}
              planName = "Extra Premium"
              pricingDescription = "Upgrade to extra premium to access all features and enjoy prioritized support."
              inPlan1 = "Full Access (access to background color change feature)"
              inPlan2 = "up to 50 playlist filtered per query"             
              inPlan3="Randomized Query"
              inPlan4 = "Prioritized Support"
              trailText="7-day free trial"
            />
          </div>
            
          {isModalOpen && (
            <Modal isModalOpen={isModalOpen} setModalOpen={setModalOpen} />
          )}
        </div>
    );
}