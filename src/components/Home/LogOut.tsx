import React from "react";
import { GoogleLogout } from "react-google-login";
const LogOut = () => {
    const onSuccess = () => {
        console.log("Logged out");
        localStorage.removeItem("token");
    };
    return (
        <div>
            <GoogleLogout
                clientId="44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com"
                render={props=><div onClick={props.onClick} className="tr-nav-bar-items-container">Log Out</div>}
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};

export default LogOut;
