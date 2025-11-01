"use client"

import Authenticate from "../../components/auth/auth"
import { useState, FormEvent } from "react";
import { useSession } from "next-auth/react";
import {signIn} from "next-auth/react"
import useTrackPageView from "@/hooks/useTrackPageView";

export default function Signup() { 

    const {data: session} = useSession();
    
    // Facebook Pageview hook
    useTrackPageView('Signup Page')
    


    return(<div style={{background: 'var(--textColor1Of1)'}}>
        <Authenticate
            authTitle="Welcome"

            // The email signup up actions are within the components file
            // authClickSpotify={() => signIn("spotify", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickGoogle={() => signIn("google", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickFacebook={() => signIn("facebook", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            authClickDiscord={() => signIn("discord", {redirectTo: `/dashboard/user/${session?.user?.name}?subscription_type=${session?.user?.subscriptionType}`})}
            dontHaveAnAccount_orHaveAnAccount_Link="/login"
            dontHaveAnAccount_orHaveAnAccount_Text="Have an account?"
            dontHaveAnAccount_orHaveAnAccount_Tex2="Login"
        />
    </div>)
}