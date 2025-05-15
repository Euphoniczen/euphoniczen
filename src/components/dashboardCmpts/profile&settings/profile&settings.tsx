"use client"

import Image from "next/image"
import Link from "next/link"
import profileStyle from "./profile&settings_style.module.css"
import { useState, useEffect } from "react"
import axios from "axios"
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Tooltip from '@mui/material/Tooltip';

import Logo from "../../../../public/Brand logo update.svg"
import JoinLeftIcon from '@mui/icons-material/JoinLeft';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import SettingsTwoToneIcon from '@mui/icons-material/SettingsTwoTone';
import QuestionMarkRoundedIcon from '@mui/icons-material/QuestionMarkRounded';
import QueueMusicRoundedIcon from '@mui/icons-material/QueueMusicRounded';

interface profileANDsetting {
    gradePurple: boolean; 
    setGradePurple: (value: boolean) => void;
    gradeBlack: boolean; 
    setGradeBlack: (value: boolean) => void;
    gradeDefault: boolean; 
    setGradeDefault: (value: boolean) => void;
    autoWidthFit: boolean; 
    setAutoWidthFit: (value: boolean) => void;

    toggleOpenSettings: boolean; 
    setToggleOpenSettings: (value: boolean) => void;
}

export default function Profile_AND_Setting({
                                            gradePurple,
                                            setGradePurple,
                                            gradeBlack,
                                            setGradeBlack,
                                            gradeDefault,
                                            setGradeDefault,
                                            autoWidthFit,
                                            setAutoWidthFit,

                                            toggleOpenSettings,
                                            setToggleOpenSettings
                                        }: profileANDsetting) { 

        const handleGradePurple = () => {
            localStorage.setItem('selectedColor', 'purple')
            setGradePurple(true);
            setGradeBlack(false);
            setGradeDefault(false)
        }

        const handleGradeOrange = () => {
            localStorage.setItem('selectedColor', 'black')
            setGradeBlack(true);
            setGradePurple(false);
            setGradeDefault(false)

        }

        const handleGradeDefault = () => {
            localStorage.setItem('selectedColor', 'default')
            setGradeDefault(true);
            setGradeBlack(false);
            setGradePurple(false);
        }

        // This runs the colors saved in the local stogre on load
        useEffect(() => {
            const savedColor = localStorage.getItem('selectedColor');
            if (savedColor === 'purple') {
                setGradePurple(true);
                setGradeBlack(false);
                setGradeDefault(false);
            } else if (savedColor === 'black') {
                setGradeBlack(true);
                setGradePurple(false);
                setGradeDefault(false);
            } else {
                setGradeDefault(true);
                setGradeBlack(false);
                setGradePurple(false);
            }
        }, []);

        const handleAutoWidthFit = () => { 
            setAutoWidthFit(!autoWidthFit)
        }

        const EnterFullscreen = () => {
            const elem = document.documentElement;

            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if ((elem as any).webkitRequestFullscreen) { 
                (elem as any).webkitRequestFullscreen();
            }
        };

        const handleToggleSettings = () => {
            setToggleOpenSettings(!toggleOpenSettings);
        }

    // Code Below is to check if the user subscription type for access to color balls feature
    const [subscriptionType, setSubscriptionType] = useState("") 
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
       const fetchSubscriptionType = async () => {
        try{
            const response = await axios.get('/api/subscription_name');
            const subType = response.data.getSubscriptionName;
            setSubscriptionType(subType);
        } catch(error) {
            console.error("error found", error); 
        }
       }
       fetchSubscriptionType(); 
    }, [])

    const isColorChangeAllowed = subscriptionType === 'Extra Premium';
    const containerClass = isColorChangeAllowed
    ? profileStyle.someProfileButtons
    : profileStyle.disableFieldBallColors_container;

    return(
        <div id={profileStyle.profileStyleMaster}>
            <div className={profileStyle.profileStyleContent}>
                <div className={profileStyle.logoProfile}>
                    <Link href="/"><Image className={profileStyle.logoDashboard} src={Logo || "/placeholder.svg"} alt="logo"></Image></Link>
                </div>
                {subscriptionType === 'Premium' ? (
                    <Tooltip title="Subscribe to Extra Premium to unlock">
                        <div className={containerClass}>
                            <LockOutlinedIcon className={profileStyle.lockIcon} sx={{ fontSize: 36 }}/>
                            <div className={profileStyle.ColorBalls_Profile}>
                                <div onClick={isColorChangeAllowed ? handleGradePurple : undefined} className={profileStyle.ball_1_profile}></div>
                                <div onClick={isColorChangeAllowed ? handleGradeOrange : undefined} className={profileStyle.ball_2_profile}></div>
                                <div onClick={isColorChangeAllowed ? handleGradeDefault : undefined} className={profileStyle.ball_3_profile}></div>
                            </div>
                        </div>
                    </Tooltip>
                ) : (
                    <div className={containerClass}>
                        {subscriptionType === "Premium" && <LockOutlinedIcon className={profileStyle.lockIcon} sx={{ fontSize: 36 }}/>}
                        <div className={profileStyle.ColorBalls_Profile}>
                            <div onClick={isColorChangeAllowed ? handleGradePurple : undefined} className={profileStyle.ball_1_profile}></div>
                            <div onClick={isColorChangeAllowed ? handleGradeOrange : undefined} className={profileStyle.ball_2_profile}></div>
                            <div onClick={isColorChangeAllowed ? handleGradeDefault : undefined} className={profileStyle.ball_3_profile}></div>
                        </div>
                    </div>
                )}
                {/*  */}
                <div className={profileStyle.moreDataProfile}>
                    <div onClick={handleAutoWidthFit}><JoinLeftIcon className={profileStyle.moreDataProfile_img}/></div>
                    <Link href='/contact' target="__blank"><SupportAgentIcon className={profileStyle.moreDataProfile_img}/></Link>
                    <div onClick={EnterFullscreen}><DynamicFeedIcon className={profileStyle.moreDataProfile_img}/></div>
                    <Link href="https://open.spotify.com/user/31ggduwvlf7zt5xpynylf2527yka" target="__blank"><QueueMusicRoundedIcon className={profileStyle.moreDataProfile_img}/></Link>
                </div>
                <div className={profileStyle.setthings_section}>
                    <div></div>
                    <div onClick={handleToggleSettings}><SettingsTwoToneIcon className={profileStyle.settingsProfile_img}/></div>
                    <Link target="_blank" href="/terms&conditions"><QuestionMarkRoundedIcon className={profileStyle.settingsProfile_img}/></Link>
                </div>
            </div>
        </div>
    )
} 