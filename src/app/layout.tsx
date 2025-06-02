import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Euphoniczen",
  description: "Euphoniczen lets artists, producers, labels & other music creatives search Spotify playlists by name, mood, theme, or genre to find contact details for playlist submissions, all in one place."
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{

  return (
    <html lang="en">
      <SessionProvider>
      <body >
         <Header/>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '1155035563060946');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1155035563060946&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
        {children}
        <Analytics/>
        <SpeedInsights/>
        <Footer/>
      </body>
      </SessionProvider>
    </html>
  );
}
