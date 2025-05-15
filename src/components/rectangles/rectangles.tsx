import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@mui/material";

interface RectangleComponent{ 
    rectangleWidth?: string;
    rectangleHeight?: string; 
    rectangeAvatarIn?: React.ReactNode | string;
    rectangleBorder?: string; 
    rectangleBorderRadius?: string; 
    rectangleText?: string; 
    rectangleBackgroundColor?: string; 
    rectangleTextColor?: string; 
    rectangleClassName?: string;
}

export default function Rectangle({ 
    rectangleWidth = "100%",
    rectangleHeight = "fit-content",
    rectangeAvatarIn = "https://cdn.getyourguide.com/img/country/5cf636a227021.jpeg/88.jpg" as string, 
    rectangleBorder = "solid 2px var(--textColor2)", 
    rectangleBorderRadius = "7px", 
    rectangleText = "by all means. No cap", 
    rectangleBackgroundColor = "var(--textColor1)", 
    rectangleTextColor = "var(--textColor2)",
    rectangleClassName = ""
}: RectangleComponent) { 


    return(<>
     <div style={{width: rectangleWidth, 
                  height: rectangleHeight,
                  border: rectangleBorder,
                  borderRadius: rectangleBorderRadius,
                  backgroundColor: rectangleBackgroundColor, 

                  display: 'flex', 
                  gap: '8px',
                  alignItems: 'center',
                  justifyContent: 'center', 
                  padding: '8px 20px'
                  }} className={rectangleClassName}>
       {/* {typeof rectangeAvatarIn === "string" ? (
        <Image alt="avatar" width={30} height={30} src={rectangeAvatarIn} />
      ) : (
        <div style={{width: '30px', height: '30px', display: 'flex', alignItems: 'center'}}>{rectangeAvatarIn}</div> // Renders JSX component (e.g., <SearchIcon />)
      )} */}
        <h3 style={{color: rectangleTextColor}}>{rectangleText}</h3>
     </div>
    </>)
}