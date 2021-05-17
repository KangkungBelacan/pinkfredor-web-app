import React from "react";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
const Navbar = () => {
    return (
        <nav className="tr-nav-bar-container">
            <a href="" className="tr-nav-bar-items-container">About</a>
            <a href="http://localhost:3000/help" className="tr-nav-bar-items-container">Help</a>
            {/* <div className="tr-nav-bar-items-container">Login</div> */}
            <Login />
            <LogOut />
        </nav>
    );
};

export default Navbar;
