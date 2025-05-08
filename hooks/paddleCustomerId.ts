"use client"

import axios from "axios"
import { useState, useEffect } from "react"


export default function paddleCustomerId() { 

    const [getCustomerId, setCustomerId] = useState<string>("");

    useEffect(() => {
        axios.get('/api/get_paddle_customer_id', { 
        })
        .then(function(response) {
            setCustomerId(response.data.getCustomerId)
        })
        .catch(function(error) {
            console.error("there was an error", error);
            console.log(error);  
        })
    }, [])

    return getCustomerId; 
}