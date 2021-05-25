import React, { useState } from "react";
import { GoogleLogin } from "react-google-login";
import { Redirect } from "react-router";
import { axios } from "./../../global-imports";
const clientID =
    "44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com";

const Login = (props:any) => {

    const onSuccess = (res: any) => {
        // console.log(res);
        axios
            .post("/api/auth/login", {
                tokenId: res.tokenId,
            })
            .then((res: any) => {
                console.log(res);
                if (typeof res.data.token !== "undefined") {
                    localStorage.setItem("token", res.data.token);
                    props.setlogon(true);
                    return;
                }
                alert("Login unsuccessful");
            });
    };
    const onFailure = (res: any) => {
        console.log(res);
    };

    return (
        <div style={{display: props.show ? "block" : "none"}}> 
            <GoogleLogin
                clientId={clientID}
                render={(props) => (
                    <div
                        onClick={props.onClick}
                        className="tr-nav-bar-items-container"
                    >
                        Login
                    </div>
                )}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
};

export default Login;
