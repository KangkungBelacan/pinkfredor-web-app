import "./../../pages/UserAccount";
import React, { useState } from 'react';


const Sidebar = (props: any) => {
    const [SidebarWidth,setSidebarWidth] = useState("0px")
    return (
        <div>
            <div className="sidebar" style={{width:SidebarWidth}} >
            <a href="javascript:void(0)" className="Deactivate" onClick={() => setSidebarWidth("0px")}>×</a>
            <a href={props.link1}>{props.line1}</a>
            <a href={props.link2}>{props.line2}</a>
            <a href={props.link3}>{props.line3}</a>
            <a href={props.link4}>{props.line4}</a>
            </div>
            <div>
            <button className="Activate" onClick={() => setSidebarWidth("250px")}>☰</button>  
            </div>
        </div>
    );
};

export default Sidebar;