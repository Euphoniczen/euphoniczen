import { NextResponse } from "next/server";
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
    try{
        const {from, to, replyTo, subject, text} = await req.json();

        const {data, error} = await resend.emails.send({
            from: 'Resend Cultertraz <onboarding@resend.dev>',
            to: [to],
            replyTo: [replyTo],
            subject: subject,
            text: text
        })

        if(error) {
            return NextResponse.json({error}, {status: 500}); 
        }

        return NextResponse.json(data);

    } catch(error) {
        return NextResponse.json({error}, {status: 500})
    }
} 