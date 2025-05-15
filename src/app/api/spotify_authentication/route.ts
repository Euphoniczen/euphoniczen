import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest) {

    const clientId = process.env.AUTH_SPOTIFY_ID
    const clientSecret = process.env.AUTH_SPOTIFY_SECRET

    try {
        const authString = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST', 
            headers: {
                'Authorization': `Basic ${authString}`, 
                'Content-Type': 'application/x-www-form-urlencoded',
            }, 
        body: new URLSearchParams({
                grant_type: 'client_credentials'
            }).toString()
        })

        if(!response.ok) { 
            const error = await response.text; 
            return NextResponse.json({error}, {})
        }

        // This code works if the response is ok
        const data = await response.json(); 
        return NextResponse.json({'access_token': data.access_token}, {status: 200});

    } catch(error) {
        console.error(error)
        return NextResponse.json({'error': (error as Error).message})
    }
}