// This api called "subscription_name will be used to get the name Premium or Extra Premuim ---"
import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import {auth} from "../../../../auth"


export async function GET(req: NextRequest) {
    const session = await auth(); 

    try{
        const getSubscriptionName = await prisma.subscriptionData.findFirst({
            where: {
                subscriberEmail: {
                    equals: session?.user.email,
                },
            },
            select: {
                subscriptionName: true,
            },
            orderBy: {
                createdAt: 'desc',
            }
        })

        if(getSubscriptionName) {
            return NextResponse.json({
                status: 200, 
                getSubscriptionName: getSubscriptionName.subscriptionName
            }); 
        } else {
            return NextResponse.json({
                status: 400, 
                message: "cannot find subscription name"
            }); 
        } 
    }  catch(error){
        return NextResponse.json({
            status: 500,
            message: "Something went wrong",
            error: error instanceof Error ? error.message : error,
          });
      }
}