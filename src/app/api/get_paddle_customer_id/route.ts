import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import {auth} from "../../../../auth"

export async function GET(req: NextRequest) { 
    const session = await auth(); 
    try {
        const getCustomerId = await prisma.customerCreated.findFirst({
            where: {
                customerCreatedEmail: {
                    equals: session?.user?.email
                },
            }, 
            select: {
                customerCreatedId: true,
            }
        })
        if(getCustomerId) {
            return NextResponse.json({
                status: 200, 
                getCustomerId: getCustomerId.customerCreatedId
            })
        } else{
            return NextResponse.json({
                status: 404, 
                message: "Customer not found"
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