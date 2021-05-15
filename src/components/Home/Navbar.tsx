import React from "react";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
const Navbar = () => {
    return (
        <nav className="tr-nav-bar-container">
            <div className="tr-nav-bar-items-container">About</div>
            <div className="tr-nav-bar-items-container">Help</div>
            {/* <div className="tr-nav-bar-items-container">Login</div> */}
            <Login />
            <LogOut />
        </nav>
    );
};

export default Navbar;
