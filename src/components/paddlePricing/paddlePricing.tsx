"use client"

import UsePaddle from "../../../hooks/usePaddle"
import { useRouter } from "next/navigation"
import { useSession } from 'next-auth/react'

interface PriceIdInterface {
  priceId?: string; 
}

// Premium function
export function paddlePricing({priceId}: PriceIdInterface) { 

    const paddle = UsePaddle(); 
    const router = useRouter(); 
    const {data: session} = useSession();

        const openPaddleCheckout = (event: React.MouseEvent) => {
          event.preventDefault();

          if (!session?.user?.email) {
            router.push("/signup");
            return;
          }

          paddle?.Checkout.open({
            items: [
              {
                priceId: priceId || "", 
                quantity: 1,
              },
            ],
            customData: {
              userId: session?.user.id,
              email:  session?.user.email,
            },
            
            customer: {
              email: session?.user?.email || "",
            },
            settings: {
              theme: "light",
              displayMode: "overlay",
              variant: "one-page",
              successUrl: `${window.location.origin}/payment-success`
            },
          })
        }
        return openPaddleCheckout;
  }