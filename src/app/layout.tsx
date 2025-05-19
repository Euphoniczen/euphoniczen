import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next"

import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Euphoniczen",
  description: "Search. Filter. Contact. All Things Playlists in One Place.",
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
        <Footer/>
      </body>
      </SessionProvider>
    </html>
  );
}
