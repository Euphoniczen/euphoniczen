"use client"

import DoneAllIcon from '@mui/icons-material/DoneAll';
import Link from "next/link"
import "./paymentSuccessStyle.css"
import { useSession } from 'next-auth/react';
import useTrackPageView from '@/hooks/useTrackPageView';

export default function SuccessPage() {

    const {data: session} = useSession(); 

    // Facebook Pageview hook
    useTrackPageView('Payment-Success Page')
    

  return (
    <div className="success-container">
      <div className="success-card">
        <div className="icon-container">
          <DoneAllIcon className="success-icon" />
        </div>

        <h1 className="success-title">Payment Successful!</h1>
        <p className="success-message">Thank you for your subscription</p>

        <div className="order-summary">
          <div className="summary-row">
            <span className="summary-label">Plan:</span>
            <span className="summary-value">{session?.user?.subscriptionType ? session?.user?.subscriptionType : 'loading...'}</span>
          </div>
          <div className="order-confirmed-text">
            <p>Order confirmed — see your email for all the details.</p>
          </div>
        </div>

    <Link style={{textDecoration: 'none'}}
        href={`/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`}
        >
        <button className="continue-button">Continue to Dashboard </button>
    </Link>
      </div>
    </div>
  )
}
