"use client"

import axios from "axios"
import { useState, useEffect } from "react"


export default function userSubscriptionData() { 

    const [getUserStatus, setGetUserStatus] = useState<string>("");

    useEffect(() => {
        axios.get('/api/subscription_status', { 
        })
        .then(function(response) {
            setGetUserStatus(response.data.getSubscriptionStatus)
        })
        .catch(function(error) {
            console.error("there was an error", error);
            console.log(error);  
        })
    }, [])

    return getUserStatus; 
}