import { NextRequest, NextResponse } from "next/server";
import {prisma} from "../../../../prisma"
import {auth} from "../../../../auth"

export async function GET(req: NextRequest) { 
    const session = await auth(); 

    try {
        const getSubscriptionStatus = await prisma.subscriptionData.findFirst({
            where: {
                subscriberEmail: {
                    equals: session?.user?.email
                },
            }, 
            select: {
                subscriptionStatus: true,
            }
        })
        if(getSubscriptionStatus) {
            return NextResponse.json({
                status: 200, 
                getSubscriptionStatus: getSubscriptionStatus.subscriptionStatus
            })
        } else {
            return NextResponse.json({
                status: 404, 
                message: "Subscription status for user is not found"
            })
        }
    } catch(error) {
        return NextResponse.json({
            status: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
          });
    }
}