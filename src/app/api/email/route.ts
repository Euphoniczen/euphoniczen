import { NextResponse } from "next/server";
import { Resend } from 'resend';
import {auth} from "@/auth"

const resend = new Resend(process.env.RESEND_API_KEY)

// Helper function to delay execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function POST(req: Request) {
  try {
    const session = await auth(); 
    const { from, to, replyTo, subject, text } = await req.json();

    // mail to handle multiple recipients --unique to each
    const recipients = Array.isArray(to) ? to : [to];
    const results: any[] = []; 

    // Rate limit: 2 requests per second = 500ms between requests
    const RATE_LIMIT_DELAY = 500; // milliseconds

    for (let i = 0; i < recipients.length; i++) {
      const email = recipients[i];
      
      // Add delay between requests (except for the first one)
      if (i > 0) {
        await delay(RATE_LIMIT_DELAY);
      }

      const data = await resend.emails.send({
        from: `${session?.user?.name} <mail@mail.euphoniczen.com>`,
        to: email,
        replyTo,
        subject,
        text,
      });

      results.push(data);
    }

    return NextResponse.json({success: true, results});
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: (error as Error).message || JSON.stringify(error) },
      { status: 500 }
    );
  }
}