import React from "react";
import { GoogleLogout } from "react-google-login";
const LogOut = (props: any) => {
    const onSuccess = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };
    return (
        <div style={{display: props.show ? "block" : "none"}}>
            <GoogleLogout
                clientId="44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com"
                render={props=><div onClick={props.onClick} className="tr-nav-bar-items-container">Log Out</div>}
                onLogoutSuccess={onSuccess}
            ></GoogleLogout>
        </div>
    );
};

export default LogOut;
