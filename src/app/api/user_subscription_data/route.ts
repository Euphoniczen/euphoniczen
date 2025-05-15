import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {

    const parsedData = await req.json(); //this is the json data | the rawPayload itself
    
    const eventType = parsedData.event_type || 'unknown';
    const subscriptionId = parsedData.data?.id || 'unknown'
    const subscriptionStatus = parsedData.data?.status || 'unknown'

    const items = parsedData.data?.items ?? [];
    const subscriptionName = items[0]?.product?.name ?? 'unknown';
    
    const subscriberEmail = parsedData.data?.custom_data?.email || 'unknown'


    await prisma.subscriptionData.create({
      data: {
        rawPaylod: parsedData, 
        eventType,
        subscriptionId, 
        subscriptionName, 
        subscriptionStatus,
        subscriberEmail , 
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Paddle webhook error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}