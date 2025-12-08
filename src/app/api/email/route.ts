import { NextResponse } from "next/server";
import { Resend } from 'resend';
import {auth} from "@/auth"

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const session = await auth(); 
    const { from, to, replyTo, subject, text } = await req.json();

    // mail to handle multiple recipients --unique to each
    const recipients = Array.isArray(to) ? to : [to];
    const results: any[] = []; 

    for (const email of recipients) {
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