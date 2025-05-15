import { NextResponse, NextRequest } from "next/server";
import {prisma} from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const newsletterData = await prisma.newsLetter.create({
      data: {
        email: email,
      },
    });

    return NextResponse.json({ success: true, data: newsletterData }, { status: 200 });
  } catch (error: any) {
    console.error("Newsletter subscription failed:", error);
    return NextResponse.json({ error: error.message || "Internal Server Error" }, { status: 500 });
  }
}