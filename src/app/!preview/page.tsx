"use client"

import PlaylistGrid from "@/src/components/dashboardCmpts/playlistCards/playlist-grid"

export default function Preview() {
    return(<div
        style={
            {
                minHeight: '100vh'
            }
        }
    >
        <PlaylistGrid/>
        </div>)
}