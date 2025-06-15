import { NextRequest, NextResponse } from "next/server";
import {prisma} from '@/lib/prisma'
import {auth} from '@/auth'

export async function GET(req: NextRequest) {
    
    const sessionId = await auth();

    try {
        const sptfyPlaylists = await prisma.storedPlaylists.findMany({
            where: {
                User: {
                    id: sessionId?.user?.id ?? ""
                }
            },
            select: {
                // storedSpotifyPayload: true, --do not use as database data transfer will be high 
                spotifyId: true,           
                name: true,                    
                description: true,           
                followerCount: true,           
                trackCount: true,             
                curatorName: true,             
                imageUrl:true              

            }, 
            orderBy: {
                id: "desc"
            }
        })

        return NextResponse.json({
            status: 200, 
            sptfyPlaylists
        })

    } catch(error) {
        console.error("error occurred", error)
        return NextResponse.json({
            status: 500, 
            errorMessage: error
        })
     }
}