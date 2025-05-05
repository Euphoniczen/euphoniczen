"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import "./popupStyle.css";
import axios from "axios";

export default function PopupSubscription() {

    const [closeButton, setCloseButton] = useState(false)
    const handleCloseButton = () => {
        setCloseButton(true)
    }

    "https://api.paddle.com/subscriptions/{subscription_id}/cancel"
    const handleCancelSubscription = async () => {
      axios.get("/api/subscription_cancelled", {})
      .then(function (response) {
        console.log(response)
        alert("Subscription Cancelled Successfully")
        setCloseButton(true)
      })
      .catch(function(error) {
        console.error(error)
        alert("there was an error cancelling subscription")
      })
    }

  return (
    <>
      <div style={closeButton ? {display: 'none'} : {}} id="popup_subscription_master">
        <div className="popupSubscription_content">
          <div className="theContent_popupSubscription">
            <h2>Confirm Cancellation</h2>
            <p style={{fontWeight: '530'}}>
              If you cancel your subscription, you'll lose access to all Euphoniczen features
              at the end of your current billing period.
            </p>
            <div className="subscriptionPopup_Buttons">
              <button onClick={handleCloseButton}>Close</button>
              <button onClick={handleCancelSubscription}>Cancel Subscription</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
