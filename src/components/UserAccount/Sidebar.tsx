import "./../../pages/UserAccount";
import React, { useState } from 'react';
import HomeImage from './../../images/home.jpg'
import AppImage from './../../images/music.png'
import HelpImage from './../../images/help.jpg'
import AboutImage from './../../images/about.png'

const Sidebar = (props: any) => {
    const [SidebarWidth,setSidebarWidth] = useState("0px")
    return (
        <div>
            <div className="sidebar" style={{width:SidebarWidth}}>
            <a href="javascript:void(0)" className="Deactivate" onClick={() => setSidebarWidth("0px")}>×</a>
            <a>My Account</a>
            <img className="RoundedImage" src={HomeImage} alt="HomeAvatar"></img>
            <a href={props.link1}>{props.line1}</a>
            <img className="ResizeImage1" src={AppImage} alt="AppAvatar"></img>
            <a href={props.link2}>{props.line2}</a>
            <img className="ResizeImage2" src={HelpImage} alt="HelpAvatar"></img>
            <a href={props.link3}>{props.line3}</a>
            <img className="ResizeImage3" src={AboutImage} alt="AboutAvatar"></img>
            <a href={props.link4}>{props.line4}</a>
            </div>
            <div>
            <button className="Activate" onClick={() => setSidebarWidth("250px")}>☰</button>  
            </div>
        </div>
    );
};

export default Sidebar;