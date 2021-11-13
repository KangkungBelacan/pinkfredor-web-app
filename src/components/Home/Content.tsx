import React, {useState} from "react";
import Intro1 from "./../../images/Intro_Night.png";
import Intro2 from "./../../images/Intro_Night_2.png";
import Login from "./../../components/Home/Login";
import LogOut from "./../../components/Home/LogOut";
import Logo from "./../../images/Logo.png"

const Content = () => {
    const [logon, setlogon] = useState(false);
    return (
        <div>
            <nav className="Flexible">
                <link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Varela+Round" />
                <div className="brand-name">
                    <img className="TestImage" src={Logo}/>
                    <div className="brand-name-item">Pinkfredor</div>
                </div>
                <div className="tr-nav-bar-container">
                    <a href="/help" className="tr-nav-bar-items-container">Help</a>
                    <a href="/about" className="tr-nav-bar-items-container">About</a>
                    <LogOut show={logon} />
                </div>
            </nav>
            <div className="home-h2">
                Streams your private music collection from Google Drive
            </div>
            <Login setlogon={setlogon}/>
            <a href="/app" style={{display: logon ? "block" : "none"}} className="TextAnime">Go to Main App</a>
            <div>
                <img className="Images" src={Intro1}/>
            </div>
            <div>
                <img className="Images2" src={Intro2}/>
            </div>
        </div>
    );
};

export default Content;
