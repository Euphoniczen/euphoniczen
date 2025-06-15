import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma';
import {auth} from '@/auth'

export async function POST(req: NextRequest) { 

    const {spotifyData} = await req.json();
    const session = await auth()


    try {
        const storeSpotifyPayload = await prisma.storedPlaylists.create({
            data: {
                email: session?.user?.email,
                storedSpotifyPayload: spotifyData,
                spotifyId: spotifyData?.id,
                name: spotifyData?.name, 
                description: spotifyData?.description, 
                followerCount: spotifyData?.followers?.total, 
                trackCount: spotifyData?.tracks?.total, 
                curatorName: spotifyData?.owner?.display_name, 
                imageUrl: spotifyData?.images?.[0]?.url,
                User: {
                    connect: {
                        id: session?.user?.id ?? ""
                    }
                }
            },
        })
        return NextResponse.json({
            status: 200, 
            storeSpotifyPayload
        })

    } catch(error) {
        console.error(error)
        return NextResponse.json({
            status: 500, 
            message: error || String(error)
        })
    }

}