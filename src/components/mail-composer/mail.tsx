'use client'

import { useState, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import "./mail-style.css"
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { SuccessAlert, ErrorAlert } from "../ui/alerts"

interface MailComposeInterface { 
  recipients: string[]
  setRecipients: (r: string[]) => void
}

export function EmailCompose({
  recipients,
  setRecipients,
}: MailComposeInterface) {

  //session
  const {data: session} = useSession();

  // Internal component state
  const [currentRecipient, setCurrentRecipient] = useState("")
  const [from, setFrom] = useState(session?.user?.email || "enter your email here")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [dropdown, setDropDown] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true)
  const [alertComponent, setAlertComponent] = useState<React.ReactNode>(null)

  const handleAddRecipient = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentRecipient.trim()) {
      e.preventDefault()
      if (!recipients.includes(currentRecipient.trim())) {
        setRecipients([...recipients, currentRecipient.trim()])
        setCurrentRecipient('')
      }
    }
  }

  const handleRemoveRecipient = (email: string) => {
    setRecipients(recipients.filter((r) => r !== email))
  }

  const handleSend = () => {
    if (recipients.length === 0 || !from || !body) {
      setAlertComponent(
        <ErrorAlert key={Date.now()} errorMessage='Please fill in all required fields'/>
      )
      return
    }

    axios.post('/api/email', {
      to: recipients,
      replyTo: from,
      subject: subject,
      text: body
    })
    .then(function (response) {
      console.log(response.data)
    // Reset internal fields (recipients comes from parent)
      setFrom('')
      setSubject('')
      setBody('')
      setRecipients([])
      setAlertComponent(
        <SuccessAlert key={Date.now()} successMessage='Mail sent successfully'/>
      )
    })
    .catch(function (error) {
      console.log(error)
      setAlertComponent(
        <ErrorAlert key={Date.now()} errorMessage="server error"/>
      )
    })
  }

  return (
    <>
    {alertComponent}
      <div className="email-card">
        <div className="fields-container">
          {/* To Field */}
          <div className="field">
            <label className="label">To</label>
            <div className="field-content">
              <div className={`recipients-container ${dropdown ? "open" : ""}`}>
                {recipients.map((email) => (
                  <span key={email} className="badge">
                    {email}
                    <button
                      onClick={() => handleRemoveRecipient(email)}
                      className="remove-button"
                    >
                      <X className="icon" />
                    </button>
                  </span>
                ))}

                <input
                  type="email"
                  placeholder={recipients.length > 0 ? "" : "Start by searching for playlists. Emails will propagate automatically"}
                  disabled={isDisabled}
                  value={currentRecipient}
                  onChange={(e) => setCurrentRecipient(e.target.value)}
                  onKeyDown={handleAddRecipient}
                  className="input-mail"
                  style={{cursor: 'not-allowed'}}
                />
                </div>
            </div>
             <div onClick={() => setDropDown(!dropdown)} className="arrow-recipient">
                  {dropdown ? <ArrowCircleUpIcon/> : <ArrowCircleDownIcon/>}
              </div>
          </div>

          {/* From */}
          <div className="field">
            <label className="label">From</label>
            <div className="field-content">
              <input
                type="email"
                placeholder="your.email@example.com"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input-mail"
              />
            </div>
          </div>

          {/* Subject */}
          <div className="field">
            <label className="label">Subject</label>
            <div className="field-content">
              <input
                type="text"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input-mail"
              />
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="body-container">
          <textarea
            placeholder="Compose your email message here..."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="textarea"
          />
        </div>

        {/* Actions */}
        <div className="actions">
          <button onClick={handleSend} className="send-button" type="button">
            <Send className="icon" /> Send
          </button>
        </div>
      </div>
    </>
  )
}