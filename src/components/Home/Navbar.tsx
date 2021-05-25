import React from "react";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
const Navbar = () => {
    return (
        <nav className="tr-nav-bar-container">
            <a href="/app" className="tr-nav-bar-items-container">Main App</a>
            <a href="/help" className="tr-nav-bar-items-container">Help</a>
            <a href="/about" className="tr-nav-bar-items-container">About</a>
            {/* <div className="tr-nav-bar-items-container">Login</div> */}
            <Login />
            <LogOut />
        </nav>
    );
};

export default Navbar;
