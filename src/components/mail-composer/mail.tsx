'use client'

import { useState } from 'react'
import { X, Send } from 'lucide-react'
import "./mail-style.css"


interface MailComposeInterface { 
    recipients: string[]
    currentRecipient: string
    from: string
    subject: string
    body: string
    toast: { message: string; type: 'success' | 'error' } | null
    setRecipients: (r: string[]) => void
    setCurrentRecipient: (s: string) => void
    setFrom: (s: string) => void
    setSubject: (s: string) => void
    setBody: (s: string) => void
    setToast: (t: { message: string; type: 'success' | 'error' } | null) => void
    onSend: () => void
}

export function EmailCompose({
    recipients,
    currentRecipient,
    from,
    subject,
    body,
    toast,
    setRecipients,
    setCurrentRecipient,
    setFrom,
    setSubject,
    setBody,
    setToast,
    onSend
}:MailComposeInterface) {

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

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleSend = () => {
    if (recipients.length === 0 || !from || !body) {
      showToast('Please fill in all required fields', 'error')
      return
    }

    showToast(
      `Email sent to ${recipients.length} recipient${recipients.length > 1 ? 's' : ''}!`,
      'success'
    )

    // Reset form
    setRecipients([])
    setFrom('')
    setSubject('')
    setBody('')
  }

  return (
    <>
      <div className="email-card">
        <div className="fields-container">
          {/* To Field */}
          <div className="field">
            <label className="label">To</label>
            <div className="field-content">
              <div className="recipients-container">
                {recipients.map((email) => (
                  <span key={email} className="badge">
                    {email}
                    <button
                      onClick={() => handleRemoveRecipient(email)}
                      className="remove-button"
                      aria-label={`Remove ${email}`}
                    >
                      <X className="icon" />
                    </button>
                  </span>
                ))}
                <input
                  type="email"
                  placeholder="Add recipients and press Enter"
                  value={currentRecipient}
                  onChange={(e) => setCurrentRecipient(e.target.value)}
                  onKeyDown={handleAddRecipient}
                  className="input"
                />
              </div>
            </div>
          </div>

          {/* From Field */}
          <div className="field">
            <label htmlFor="from" className="label">
              From
            </label>
            <div className="field-content">
              <input
                id="from"
                type="email"
                placeholder="your.email@example.com"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                className="input"
              />
            </div>
          </div>

          {/* Subject Field */}
          <div className="field">
            <label htmlFor="subject" className="label">
              Subject
            </label>
            <div className="field-content">
              <input
                id="subject"
                type="text"
                placeholder="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="input"
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
          <button onClick={handleSend} className="send-button" type='button'>
            <Send className="icon" />
            Send
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
    </>
  )
}