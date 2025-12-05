'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import ArrowCircleDownIcon from '@mui/icons-material/ArrowCircleDown';
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';
import "./mail-style.css"
import axios from 'axios';

interface MailComposeInterface { 
  recipients: string[]
  setRecipients: (r: string[]) => void
}

export function EmailCompose({
  recipients,
  setRecipients,
}: MailComposeInterface) {

  // Internal component state
  const [currentRecipient, setCurrentRecipient] = useState("")
  const [from, setFrom] = useState("")
  const [subject, setSubject] = useState("")
  const [body, setBody] = useState("")
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [dropdown, setDropDown] = useState(false);

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
      alert('Please fill in all required fields')
      return
    }

    axios.post('/api/email', {
      to: recipients,
      replyTo: 'cultertraz@gmail.com',
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
    })
    .catch(function (error) {
      console.log(error)
      alert(error)
    })
  }

  return (
    <>
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
                  // placeholder="Add recipients and press Enter"
                  value={currentRecipient}
                  onChange={(e) => setCurrentRecipient(e.target.value)}
                  onKeyDown={handleAddRecipient}
                  className="input-mail"
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