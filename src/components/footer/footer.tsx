"use client"

import Image from "next/image"
import Link from "next/link"
import FooterStyle from "./footerStyle.module.css"
import 'bootstrap-icons/font/bootstrap-icons.css';
import CopyrightIcon from '@mui/icons-material/Copyright';
import { usePathname } from "next/navigation";

const Footer = () => { 

    const fullYear = new Date().getFullYear();

    const pathname = usePathname(); 

    if(pathname.startsWith('/dashboard') || pathname.startsWith("/payment-success")) { 
        return null;
    }


    return(<div id={FooterStyle.footerContainerMaster}>
        <div className={FooterStyle.contentContainer}>
            <div className={FooterStyle.logoSectionFoot}>
               <div className={FooterStyle.copyrightFoot}>
                    <CopyrightIcon/>
                    <p>{fullYear}</p>
               </div>
               {/* <div className={FooterStyle.dotsAtLogoFoot}>•</div> */}
                <Link style={{textDecoration: 'none'}} href="/"><p className={FooterStyle.fooer_logo}>Euphoniczen</p></Link>
            </div>
            <div className={FooterStyle.social_links_foot}>

            <ul className={FooterStyle.footerUl}>
                <Link href="/terms&conditions">TERMS & CONDITIONS</Link>
                <Link href="/privacy_policy">PRIVACY POLICY</Link>
            </ul>

            <div className={FooterStyle.i_tags_foot_social_links}>
                <Link target="_blank" href="http://instagram.com/euphoniczen"><i className="bi bi-instagram" style={{ fontSize: '20px', color: 'var(--textColor2)', cursor: 'pointer'}}></i></Link>
                <Link target="_blank" href="http://tiktok.com/euphoniczen"><i className="bi bi-tiktok" style={{ fontSize: '20px', color: 'var(--textColor2)', cursor: 'pointer'}}></i></Link>
                <Link target="_blank" href="http://x.com/euphoniczen"><i className="bi bi-twitter-x" style={{ fontSize: '20px', color: 'var(--textColor2)', cursor: 'pointer'}}></i></Link>
                <Link target="_blank" href="http://threads.com/euphoniczen"><i className="bi bi-threads" style={{ fontSize: '20px', color: 'var(--textColor2)', cursor: 'pointer'}}></i></Link>
                <Link target="_blank" href="http://facebook.com/euphoniczen"><i className="bi bi-facebook" style={{ fontSize: '20px', color: 'var(--textColor2)', cursor: 'pointer'}}></i></Link>

            </div>
            </div>
        </div>
    </div>)
}
export default Footer;