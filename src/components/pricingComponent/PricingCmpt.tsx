"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import pricingCmptStyle from "./pricingCmptStyle.module.css";
import Buttons from "../Buttons/Buttons";
import DoneIcon from '@mui/icons-material/Done';

interface PricingComponentProps { 
    price?: number; 
    monthOrYear?: string; 
    planName?: string; 
    pricingDescription?: string; 
    inPlan1?: string; 
    inPlan2?: string; 
    inPlan3?: string; 
    inPlan4?: string;
    inPlan5?: string;
    inPlan6?: string;
    inPlan7?: string;
    hideExtraFeatures?: Boolean;
    pricingBackgroundColor?: string; 
    pricingTextColor?: string;
    buttonTextSubscribe?: string; 
    buttonBackgroundColorPricing?: string;
    inPlan8?: string; 
    buttonOnClickPricing?: () => void;
}

export default function Pricing({ 
    price = 20, 
    monthOrYear = "month", 
    planName = "Starter",
    pricingDescription = "A great plan to get started djikhdh hhjdhfj jhsdhsj jshhfsh.",
    inPlan1 = "Feature 1",
    inPlan2 = "Feature 2",
    inPlan3 = "Feature 3",
    inPlan4 = "Feature 4",
    pricingBackgroundColor = 'var(--textColor1of1)',
    pricingTextColor = 'var(--textColor2)',
    buttonTextSubscribe = 'Subscribe', 
    buttonBackgroundColorPricing = "var(--kindaOrange)", 
    buttonOnClickPricing = () => alert("Pricing Button"),
    inPlan8 = "trial text", 
    inPlan5 = "",
    inPlan6 = "",
    inPlan7 = "",
    hideExtraFeatures = true, 

}: PricingComponentProps) { 

    return (
        <div id={pricingCmptStyle.pricingContMaster}>
            <div style={{backgroundColor: pricingBackgroundColor, color: pricingTextColor}} className={pricingCmptStyle.pricingCmptContent}>
                <div className={pricingCmptStyle.tier_1}>
                <div className={pricingCmptStyle.pricingFee}>
                        <h1 className={pricingCmptStyle.price}>{price}</h1> 
                        <span className={pricingCmptStyle.monthOrYear}>/{monthOrYear}</span>
                    </div>
                    <h3 className={pricingCmptStyle.planName}>{planName}</h3>
                    <p className={pricingCmptStyle.pricingDescription}>{pricingDescription}</p>
                    <ul className={pricingCmptStyle.featureList}>
                        <div className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan1}</p>
                        </div>
                        <div className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p className={pricingCmptStyle.inPlan2}>{inPlan2}</p>
                        </div>
                        <div className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan3}</p>
                        </div>
                        <div className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan4}</p>
                        </div>
                        <div className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan5}</p>
                        </div>

                        <div style={hideExtraFeatures ? {display: 'none'} : {}} className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan6}</p>
                        </div>
                        <div style={hideExtraFeatures ? {display: 'none'} : {}} className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p>{inPlan7}</p>
                        </div>


                        <div style={hideExtraFeatures ? {display: 'none'} : {}} className={pricingCmptStyle.featuresIncluded}>
                            <DoneIcon className={pricingCmptStyle.DoneIcon}/>
                            <p className={pricingCmptStyle.inPlan2}>{inPlan8}</p>
                        </div>

                        <Buttons 
                             buttonBackgroundColor={buttonBackgroundColorPricing}
                             buttonBorder="solid 2px var(--kindaWhite)" 
                             buttonHoverColor="transparent"
                             buttonRadius="8px"
                             textInButtonColor="var(--textColor1)"
                             buttonText= {buttonTextSubscribe}
                             buttonOnClick={buttonOnClickPricing} 
                            />
                    </ul>
                </div>
            </div>
        </div>
    );
}
