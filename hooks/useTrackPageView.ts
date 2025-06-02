// This page stores the hook instance to track PageView on all pages in Facebook ads manager
// The Script tag from Facebook in the layout.ts is important & should be added in order for this code to work.
'use client'

import { useEffect } from 'react'

export default function useTrackPageView(pageName: string) {
  useEffect(() => {
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'ViewContent', {
        page: pageName,
      })
    }
  }, [pageName])
}