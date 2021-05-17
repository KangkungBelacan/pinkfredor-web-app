import React from "react";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
const Navbar = () => {
    return (
        <nav className="tr-nav-bar-container">
            <a href="http://localhost:3000/app" className="tr-nav-bar-items-container">Main App</a>
            <a href="http://localhost:3000/help" className="tr-nav-bar-items-container">Help</a>
            <a href="" className="tr-nav-bar-items-container">About</a>
            {/* <div className="tr-nav-bar-items-container">Login</div> */}
            <Login />
            <LogOut />
        </nav>
    );
};

export default Navbar;
