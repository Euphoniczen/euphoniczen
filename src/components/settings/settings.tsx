"use client"

import { useEffect, useState } from "react"
import "./settingsStyle.css"
import { useSession } from "next-auth/react"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios from "axios"
import PopupSubscription from "../popup-subscription/Popup"
import CircularProgress from '@mui/material/CircularProgress'
import Modal from "../dialog_modal/modal"



interface OpenSettings {
  settingsOpen: boolean
  setSettingsOpen: (open: boolean) => void
  customer_id?: string
}

export default function SettingsPopup({ settingsOpen, setSettingsOpen, customer_id }: OpenSettings) {
  const { data: session } = useSession()

  const [username, setUsername] = useState(session?.user?.name)
  const [showCancelPopup, setShowCancelPopup] = useState(false)
  const [email, setEmail] = useState(session?.user?.email)
  const [isLoading, setIsLoading] = useState(false)
  const [customerLoading, setCustomerLoading] = useState(false)
  const [error, setError] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [isModalOpen, setModalOpen] = useState(false)

  const userAccountCreated = session?.user?.createdAt
  const providerAuth = session?.user?.provider
  const router = useRouter()

  // Mock data for the user
  const createdAt = userAccountCreated ? new Date(userAccountCreated) : null
  const connectedAccounts = [
    // { name: "Email", connected: false },
    { name: "Discord", connected: providerAuth === "discord" },
    { name: "Google", connected: providerAuth === "google" },
    { name: "Facebook", connected: providerAuth === "facebook" },
  ]

  const handleLogout = () => {
    signOut({ callbackUrl: "/" })
  }

  const handleModalOpen = () => {
    setModalOpen(!isModalOpen)
  }

  // User Subscription Portal
  useEffect(() => {
    setCustomerLoading(true)
    axios.get('/api/get_paddle_customer_id', {
    })
    .then(function(response) {
      setCustomerId(response.data.getCustomerId)
      console.log(response.data)
    })
    .catch(function(error) {
      console.error("Failed to fetch customer ID:", error)
    })
    .finally(function() {
      setCustomerLoading(false); 
    })
  }, [])

  const handlePaddlePortalOpen = async () => {
    setIsLoading(true)
    setError("")

    try {
      
      const response = await axios.post("/api/manage_subscription", {
        customer_id: customerId, 
      })

      // Access the correct nested path for the portal URL
      if (response.data?.data?.urls?.general?.overview) {
        const portalUrl = response.data.data.urls.general.overview
        window.open(portalUrl, "_blank")
      } else {
        setError("Portal URL not found in response")
        console.error("Portal URL not found. Response structure:", JSON.stringify(response.data, null, 2))
      }
    } catch (error) {
      setError("Failed to open subscription portal")
      console.error("Error opening portal:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="modal-overlay">
      <div className="settings-card">
        <div className="card-header">
          <button className="close-button" onClick={() => setSettingsOpen(false)}>
            ✕
          </button>
          <h2 className="card-title">Account Settings</h2>
          <p className="card-description">Manage your account preferences</p>
        </div>

        <div className="card-content">
          {/* User Information */}
          <div className="section">
            <h3 className="section-title">User Information</h3>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                className="text-input"
                value={username ?? ""}
                onChange={(e) => setUsername(e.target.value)}
                readOnly
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                className="text-input"
                type="email"
                value={email ?? ""}
                onChange={(e) => setEmail(e.target.value)}
                readOnly
              />
            </div>

            <div className="created-date">
              Account created on{" "}
              {createdAt?.toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          <div className="separator"></div>

          {/* Connected Accounts */}
          <div className="section">
            <h3 className="section-title">Connected Accounts</h3>

            <div className="accounts-list">
              {connectedAccounts.map((account) => (
                <div key={account.name} className="account-item">
                  <div className="account-name">
                    <span>{account.name}</span>
                  </div>
                  <label className="switch">
                    <input type="checkbox" checked={account.connected} onChange={() => {}} />
                    <span className="slider round"></span>
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="separator"></div>

          {/* Subscription */}
          <div className="section">
            <h3 className="section-title">Subscription</h3>

            {error && <p className="error-message">{error}</p>}

            <button className="cancel-subscription-button" onClick={handleModalOpen} disabled={isLoading}>
              {isLoading ? (<div style={{display: 'flex',
                                         alignItems: 'center',
                                         gap: '7px',
                                         color: '--var(textColor1of1)'}}> Manage Subscription <CircularProgress size={12} color="inherit"/> </div>) 
              : `${customerLoading ? 'Fetching Customer...' : 'Manage Subscription'}`}
            </button>
          </div>
        </div>

        <div className="card-footer">
          <button className="close-btn" onClick={() => setSettingsOpen(false)}>
            Close
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showCancelPopup && <PopupSubscription />}

      {/* Modal that pops up  based on logic stord in button */}
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          setModalOpen={setModalOpen}

          modalTitle="You have no active subscription!"
          modalContent=""
        />
      )}
      
    </div>
  )
}