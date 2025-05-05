"use client"

import axios from "axios"
import { useState, useEffect } from "react"

interface UserSubscriptionData_Interface{
}


export default function userSubscriptionData({}: UserSubscriptionData_Interface) { 

    const [getUserStatus, setGetUserStatus] = useState<string>("");

    useEffect(() => {
        axios.get('/subscription_status', { 
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