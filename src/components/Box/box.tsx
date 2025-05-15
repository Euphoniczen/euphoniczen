import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface SquareComponent { 
    squareSizeWidth?: string; 
    squareSizeHeight ?: string; 
    squareBorder?: string; 
    squareText?: string;
    squareTextP ?: string;
    squareBackgroundColor?: string; 
    squareTextColor?: string; 
    squareClassName?: string;
    squareImageIn?: string; 
}

export default function Square({ 
    squareSizeWidth = "340px", 
    squareSizeHeight = "230px", 
    squareBorder = "solid 3px var(--kindaWhite)",  
    squareText = "by all means. No cap", 
    squareTextP = "by all means. No cap ppppp", 
    squareBackgroundColor = "var(--kindaOrange)", 
    squareTextColor = "var(--textColor2)",
    squareClassName = "",
    squareImageIn = ""
}: SquareComponent) { 

    return (
        <div style={{
            width: squareSizeWidth, 
            height: squareSizeHeight,
            border: squareBorder,
            backgroundColor: squareBackgroundColor, 

            overflow: 'hidden',
            display: 'flex', 
            flexDirection: 'column',
            // justifyContent: 'center',
            // alignItems: 'center',
            padding: '10px 15px',
            gap: '10px', 
            textAlign: 'left',
            borderRadius: '8px'
        }} className={squareClassName}>
            <div>
                <h3 style={{color: squareTextColor}}>{squareText}</h3>
                <div style={{width: '100%', height: '2.5px', backgroundColor: 'var(--textColor1)', borderRadius: '20px',  marginTop: '2.5px'}}></div>
            </div>
            <p style={{color: squareTextColor, fontWeight: '550'}}>{squareTextP}</p>
            {/* <Image src={squareImageIn} alt="image" width={320} height={400}></Image> */}
        </div>
    );
}
