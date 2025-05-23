"use client"

import Authenticate from "../../components/auth/auth"
import { useState, FormEvent, useEffect } from "react";
import { useSession } from "next-auth/react";
import {signIn} from "next-auth/react"
import axios from "axios";

export default function Signup() { 

    const [subscriptionType, setSubscriptionType] = useState("");

    useEffect(() => {
        const fetchSubscriptionType = async () => {
            try {
                const response = await axios.get('/api/subscription_name');
                setSubscriptionType(response.data.getSubscriptionName);
              } catch (error) {
                  console.error("Failed to fetch subscription type:", error);
              }
          };
  
          fetchSubscriptionType();
      }, []);

    const {data: session} = useSession();
    
    return(<div style={{background: 'var(--gradientColor2)'}}>
        <Authenticate
            authTitle="Welcome Back"

            // The email login up actions are within the components file
            // authClickSpotify={() => signIn("spotify", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickGoogle={() => signIn("google", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickFacebook={() => signIn("facebook", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickDiscord={() => signIn("discord", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            dontHaveAnAccount_orHaveAnAccount_Link="/signup"
            dontHaveAnAccount_orHaveAnAccount_Text="Don't have an account?"
            dontHaveAnAccount_orHaveAnAccount_Tex2="Signup"
        />
    </div>)
}