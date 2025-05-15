"use client"
import { useState } from "react"
import type React from "react"
import axios from "axios"

import { Copy, CheckCheck, Mail, Clock, Calendar, Phone, MessageSquare, ChevronDown, ChevronUp } from "lucide-react"
import "./contactStyle.css"

export default function ContactSection() {
  const [copied, setCopied] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [emailSubscribe, setEmailSubscribe] = useState("")
  const [subscribeSuccess, setSubscribeSuccess] = useState(false)


  const email = "contact@euphoniczen.com"

  const handleCopy = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("/api/newsletter", {
        email: emailSubscribe,
      })

      if (response.status === 200) {
        console.log("Subscribed with:", emailSubscribe)
        setSubscribeSuccess(true)
        setEmailSubscribe("")

        setTimeout(() => {
          setSubscribeSuccess(false)
        }, 3000)
      }
    } catch (error) {
      console.error("Subscription failed:", error)
    }
  }

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "What are your typical response times?",
      answer:
        "We aim to respond to all inquiries within 24 hours during business days. For urgent matters, please include 'URGENT' in your email subject.",
    },
    {
      question: "Do you offer technical support?",
      answer:
        "Yes, our technical team is available to assist with any product-related issues. Please provide detailed information about your problem when contacting us.",
    },
    {
      question: "How much does it cost to use Euphoniczen?",
      answer: "Euphoniczen offers two pricing tiers to suit different needs and budgets. Each tier comes with its own set of features and benefits. For full details, please visit our Pricing page."
    },
    {
      question: "Is Euphoniczen a useful app?",
      answer: "Yes! Euphoniczen streamlines one of the most effective strategies for music promotion—playlist placements. Instead of manually clicking through playlists hoping to find curator contact information, Euphoniczen automates the process, saving you time and helping you connect with the right curators faster."
    }
  ]

  return (
    <section className="contact-section">
      <div className="contact-content">
        <div className="contact-header">
          <h2>Contact Us</h2>
          <p>Have questions about our products or services? Our friendly and knowledgeable team is here to help. Whether you need more information, guidance, or support, we’re ready to assist you every step of the way.</p>
        </div>

        <div className="contact-methods">
          <div className="contact-method primary">
            <div className="method-icon">
              <Mail size={24} />
            </div>
            <div className="method-details">
              <h3>Email Us</h3>
              <div className="email-container">
                <a href={`mailto:${email}`} className="email-link">
                  {email}
                </a>
                <button
                  className="copy-button"
                  onClick={handleCopy}
                  aria-label="Copy email address"
                  title="Copy to clipboard"
                >
                  {copied ? <CheckCheck size={16} /> : <Copy size={16} />}
                </button>
              </div>
              <p className="response-time">We typically respond within 24 hours</p>
            </div>
          </div>

          <div className="contact-info-grid">
            <div className="contact-method secondary">
              <div className="method-icon">
                <Clock size={25} />
              </div>
              <div className="method-details">
                <h3>Business Hours</h3>
                <p>Mon-Fri: 9AM - 5PM EST</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="newsletter-section">
          <h3>Stay Updated</h3>
          <p>Subscribe to our newsletter for app updates, playlist placement offers & more.</p>

          {subscribeSuccess ? (
            <div className="subscribe-success">
              <p>Thank you for subscribing!</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <input
                type="email"
                placeholder="Your email address"
                value={emailSubscribe}
                onChange={(e) => setEmailSubscribe(e.target.value)}
                required
              />
              <button type="submit">Subscribe</button>
            </form>
          )}
        </div>

        {/* FAQ Section */}
        <div className="faq-section">
          <h3>Frequently Asked Questions</h3>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className={`faq-item ${expandedFaq === index ? "expanded" : ""}`}>
                <button className="faq-question" onClick={() => toggleFaq(index)} aria-expanded={expandedFaq === index}>
                  <span>{faq.question}</span>
                  {expandedFaq === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                {expandedFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}