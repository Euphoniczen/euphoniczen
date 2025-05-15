import { default as prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {

    const parsedData = await req.json();
    
    const eventType = parsedData.event_type || 'unknown';
    const customerCreatedId = parsedData.data.id || 'unknown';
    const customerCreatedEmail = parsedData.data.email || 'unknown'; 

    await prisma.customerCreated.create({
      data: {
        eventType,
        rawPayload: parsedData,
        customerCreatedId, 
        customerCreatedEmail, 
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}