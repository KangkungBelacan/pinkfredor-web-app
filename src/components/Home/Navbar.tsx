import React from "react";
import { useState } from "react";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
const Navbar = () => {
    const [logon, setlogon] = useState(false);

    return (
        <nav className="tr-nav-bar-container">
            <a href="/help" className="tr-nav-bar-items-container">Help</a>
            <a href="/about" className="tr-nav-bar-items-container">About</a>
            {/* <div className="tr-nav-bar-items-container">Login</div> */}
            <Login setlogon={setlogon} show={!logon} />
            <a href="/app" style={{display: logon ? "block" : "none"}} className="tr-nav-bar-items-container">Go to Main App</a>
            <LogOut show={logon} />
        </nav>
    );
};

export default Navbar;
