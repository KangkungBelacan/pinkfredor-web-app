import React from "react";
import { GoogleLogin } from "react-google-login";

const clientID =
    "44229445451-f5g42aefkck186jqdb73fojsedh3avsg.apps.googleusercontent.com";

const Login = (req: any, res: any) => {
    const onSuccess = (res: any) => {
        console.log(res);
        // console.log(res.profileObj);
    };
    const onFailure = (res: any) => {
        console.log(res);
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientID}
                render={props=><div onClick={props.onClick} className="tr-nav-bar-items-container">Login</div>}
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={"single_host_origin"}
                isSignedIn={true}
            />
        </div>
    );
};

export default Login;
