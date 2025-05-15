import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {

    const email = "cultertraz@gmail.com"

    const userCreatedDate = await prisma.user.findUnique({
        where: {
            email
        },
        select: {
            createdAt: true
        }
    })

    return NextResponse.json(userCreatedDate)
}