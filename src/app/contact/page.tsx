"use client"

import Image from "next/image";
import Link from "next/link";
import contactStyle from "./contactStyle.module.css"
import { useState } from "react";

interface SupportComponents { 
    supportHead?: string; 
    supportContent?: string;
}

const SupportComponentsInfo = ({supportHead, supportContent}: SupportComponents) => { 
    return(<>
     <h1>{supportHead}</h1>
     <p>{supportContent}</p>
    </>)
}

const Contact = () => { 

    const [disabled, setDisabled] = useState(true)
 
    return(<div id={contactStyle.contactSectionMaster}>
        <div className={contactStyle.contactSectionContent}>
            <div className={contactStyle.leftSideForm}>
                <h1>Contact Us</h1>
                <form>
                    <div className={contactStyle.firstANDLastNameInput_form}>
                        <input placeholder="First Name"></input>
                        <input placeholder="Last Name"></input>
                    </div>
                    <input placeholder="Email"></input>
                    <textarea placeholder="Write your message"></textarea>
                    <div style={{display: 'flex', gap: '14px'}}>
                        <button disabled={disabled} style={disabled ? {backgroundColor: 'grey', color: 'var(--textColor2)', cursor: 'not-allowed'} : {}} type="submit">Send Message</button>
                        <button>Contact us via Discord</button>
                    </div>
                </form>
            </div>
            <div className={contactStyle.middleLineForm}></div>
            <div className={contactStyle.rightSideForm}>
                <h2>Let's talk about everything</h2>
                <p>Feel free to contact us for any inquiries, technical issues, promotional opportunities, collaborations, or feedback. We're here to help and would love to hear from you!</p>
            </div>
        </div>
    </div>)
}
export default Contact;