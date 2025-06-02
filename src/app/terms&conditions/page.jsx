"use client"

import Link from "next/link"
import useTrackPageView from "@/hooks/useTrackPageView";

export default function Terms_And_Conditions() {

    // Facebook Pageview hook
    useTrackPageView('Terms & Conditions Page')
    
    return (
        <div id="termsANDConditions_master_cont">
            <div className="termsandconditions_container">
                <h1>Terms & Conditions</h1>
                <div className="terms-and-conditions-text">
                        <p><strong>Effective Date: </strong>May 7, 2025</p>

                        <p>Welcome to Euphoniczen! By using our website and services, you agree to comply with and be bound by the following Terms and Conditions.</p>

                        <p><strong style={{textDecoration: 'underline'}}>1. Description of Service</strong><br />
                         Euphoniczen allows users to search and filter publicly available Spotify playlists using the Spotify Web API. This service is provided “as is” and is not affiliated with or endorsed by Spotify.</p>

                        <p><strong style={{textDecoration: 'underline'}}>2. Eligibility</strong><br />
                        You must be at least 13 years old to use this service. If you are under 18, you must have permission from a parent or guardian.</p>

                        <p><strong style={{textDecoration: 'underline'}}>3. Acceptable Use</strong><br />
                        You agree not to:<br />
                        - Use the app for any unlawful activities.<br />
                        - Attempt to interfere with our servers or reverse-engineer the service.<br />
                        - Abuse the search feature (e.g., excessive automated requests).</p>

                        <p><strong style={{textDecoration: 'underline'}}>4. Intellectual Property</strong><br />
                        All trademarks, logos, and interface elements are property of Euphoniczen. Spotify logos, playlists, and data are the property of Spotify AB.</p>

                        <p><strong style={{textDecoration: 'underline'}}>5. Third-Party Services</strong><br />
                        Our app uses the Spotify Web API. Your use of Spotify’s content is also governed by Spotify’s terms: <a style={{color: 'var(--kindaOrange)'}} href="https://developer.spotify.com/terms/" target="_blank" rel="noopener noreferrer">https://developer.spotify.com/terms/</a></p>

                        <p><strong style={{textDecoration: 'underline'}}>6. Disclaimer and Limitation of Liability</strong><br />
                        We do not guarantee the accuracy or availability of playlist data. We are not liable for any damages resulting from your use of the app.</p>

                        <p><strong style={{textDecoration: 'underline'}}>7. Termination</strong><br />
                        We reserve the right to suspend or terminate your access to the service at our discretion, without notice.</p>

                        <p><strong style={{textDecoration: 'underline'}}>8. Refund Policy</strong><br />
                        We offer a free trial period so users can evaluate Euphoniczen before committing to a subscription. Once the trial period ends and a payment has been processed, all sales are final and non-refundable. Refunds will only be considered if the app experiences a complete outage lasting seven (7) consecutive days or more after initial charge.
                        </p>

                        <p><strong style={{textDecoration: 'underline'}}>9. Changes to Terms</strong><br />
                        We may update these Terms at any time. Continued use of the service implies acceptance of the new terms.</p>

                        <p><strong style={{textDecoration: 'underline'}}>10. Contact Us</strong><br />
                        If you have any questions, please contact us at: <Link style={{color: 'var(--kindaOrange)'}} href="mailto:contact@euphoniczen.com">contact@euphoniczen.com</Link></p>

                       <p><strong style={{textDecoration: 'underline'}}>11. Pricing</strong><br />
                        New users who signs up to the application, receives a 14-day free trial. Once the trial ends, your subscription will automatically begin, and you will be charged unless you cancel before the trial period concludes.</p>

                        <p>Thank you for using our service.</p>
                </div>
            </div>

            {/* Styles Below */}
            <style jsx>{`
                #termsANDConditions_master_cont {
                    min-height: 100vh;
                    font-family: var(--fontFamily1);
                    padding: 10px 10px;
                }

                .termsandconditions_container {
                    max-width: 800px;
                    margin: 0 auto;
                    display: flex;
                    align-items: flex-start; 
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 20px;
                }

                .terms-and-conditions-text {
                    font-weight: 610;
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                    line-height: 1.6;
                }

                h1 {
                    font-size: 2rem;
                    margin-bottom: 20px;
                }

                a {
                    color: blue;
                    text-decoration: underline;
                }

                /* Responsive Styles */
                @media (max-width: 768px) {
                    h1 {
                        font-size: 1.5rem;
                    }

                    .termsandconditions_container {
                        padding: 10px;
                    }

                    .terms-and-conditions-text {
                        gap: 10px;
                    }
                }

                @media (max-width: 480px) {
                    h1 {
                        font-size: 1.25rem;
                    }

                    .terms-and-conditions-text {
                        gap: 8px;
                    }
                }

                /* Very small screens - extreme responsiveness */
                @media (max-width: 320px) {
                    h1 {
                        font-size: 1rem;
                        text-align: center;
                    }

                    .termsandconditions_container {
                        padding: 5px;
                    }

                    .terms-and-conditions-text {
                        gap: 5px;
                    }

                    .terms-and-conditions-text p {
                        font-size: 0.9rem;
                    }

                    a {
                        font-size: 0.8rem;
                    }
                }
            `}</style>
        </div>
    )
}