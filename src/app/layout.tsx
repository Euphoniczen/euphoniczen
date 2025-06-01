import type { Metadata } from "next";
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
        {children}
        <Analytics/>
        <SpeedInsights/>
        <Footer/>
      </body>
      </SessionProvider>
    </html>
  );
}
