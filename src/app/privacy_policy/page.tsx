"use client"

import Link from "next/link"

export default function Privacy_Policy() {
    return (
        <div id="privacyPolicy_master_cont">
            <div className="privacy-policy-container">
                <h1>Privacy Policy</h1>
                <div className="privacy-policy-text">
                    <p><strong>Effective Date:</strong> May 7, 2025</p>

                    <p>Welcome to Euphoniczen! We respect your privacy and are committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our website and services.</p>

                    <p><strong style={{textDecoration: 'underline'}}>1. Information We Collect</strong><br />
                    We do not collect personally identifiable information unless you explicitly provide it (e.g., through a contact form or email).
                    <br />
                    We may collect the following information:
                    - Anonymous analytics data (e.g., page visits, feature usage) to improve the service.<br />
                    - Data accessed via the Spotify API (e.g., public playlist data) — this data is not stored or shared.</p>

                    <p><strong style={{textDecoration: 'underline'}}>2. Use of Spotify Data</strong><br />
                    Our app uses Spotify’s public API. We do not store or share any personal Spotify user data. We do not authenticate users through Spotify or access private Spotify accounts.<br />
                    For details on Spotify’s privacy practices, visit: <a style={{color: 'var(--kindaOrange)'}} href="https://www.spotify.com/legal/privacy-policy/" target="_blank" rel="noopener noreferrer">https://www.spotify.com/legal/privacy-policy/</a></p>

                    <p><strong style={{textDecoration: 'underline'}}>3. Cookies & Tracking</strong><br />
                    We may use cookies or third-party analytics tools (like Google Analytics) to understand usage and improve our service. You can disable cookies through your browser settings.</p>

                    <p><strong style={{textDecoration: 'underline'}}>4. Data Security</strong><br />
                    We use reasonable security measures to protect the information we process. However, no online platform is 100% secure.</p>

                    <p><strong style={{textDecoration: 'underline'}}>5. Third-Party Links</strong><br />
                    Our website may contain links to third-party websites (like Spotify). We are not responsible for their privacy practices.</p>

                    <p><strong style={{textDecoration: 'underline'}}>6. Your Rights</strong><br />
                    You have the right to contact us and request that any personal information you’ve shared be reviewed or deleted.</p>

                    <p><strong style={{textDecoration: 'underline'}}>7. Changes to This Policy</strong><br />
                    We may update this Privacy Policy from time to time. Continued use of the service after changes are made implies acceptance of the new policy.</p>

                    <p><strong style={{textDecoration: 'underline'}}>8. Contact Us</strong><br />
                    If you have any questions about this policy, please contact us at: <Link style={{color: 'var(--kindaOrange)'}} href="mailto:contact@euphoniczen.com">contact@euphoniczen.com</Link></p>

                    <p>Thank you for using Euphoniczen!</p>
                </div>
            </div>

            {/* Styles Below */}
            <style jsx>{`
                #privacyPolicy_master_cont {
                    min-height: 100vh;
                    font-family: var(--fontFamily1);
                    padding: 10px 10px;
                }

                .privacy-policy-container {
                    max-width: 800px;
                    margin: 0 auto;
                    display: flex;
                    align-items: flex-start;
                    flex-direction: column;
                    justify-content: flex-start;
                    padding: 20px;
                }

                .privacy-policy-text {
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

                    .privacy-policy-container {
                        padding: 10px;
                    }

                    .privacy-policy-text {
                        gap: 10px;
                    }
                }

                @media (max-width: 480px) {
                    h1 {
                        font-size: 1.25rem;
                    }

                    .privacy-policy-text {
                        gap: 8px;
                    }
                }

                /* Very small screens - extreme responsiveness */
                @media (max-width: 320px) {
                    h1 {
                        font-size: 1rem;
                        text-align: center;
                    }

                    .privacy-policy-container {
                        padding: 5px;
                    }

                    .privacy-policy-text {
                        gap: 5px;
                    }

                    .privacy-policy-text p {
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