import { NextRequest, NextResponse } from "next/server";


export async function POST (req: NextRequest) {

    const { customer_id } = await req.json();

     // Debug log (remove in production)
  console.log("API Key exists:", !!process.env.PADDLE_SECRET_API_KEY);
  console.log("API Key starts with:", process.env.PADDLE_SECRET_API_KEY?.substring(0, 10));

    try {
        const response = await fetch(`https://sandbox-api.paddle.com/customers/${customer_id}/portal-sessions`, {            
            method: 'POST', 
            headers: {
                'Authorization': `Bearer ${process.env.Paddle_SECRET_API_KEY}`,
                'Accept': 'application/json'
            }
        });  

        // Log the full response for debugging
    console.log("Paddle API response status:", response.status);
    console.log("Paddle API response headers:", response.headers);

        if (response.ok) {
            const data = await response.json()
            return NextResponse.json(data)
          } else {
            const errorData = await response.json()
            console.error("Paddle API error:", errorData)
            return NextResponse.json({ error: "Failed to create portal session" }, { status: response.status })
          }
      
    } catch(error) {
        console.error(error);
        return NextResponse.json({error: "Internal Server Error"}, {status: 500})
    }
}