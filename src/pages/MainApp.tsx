// import { Route } from "react-router-dom";
import PrivateRoute from "../components/generic/PrivateRoute";
import * as App from "./App";
import { AuthService } from "../services/Auth";
import { useEffect } from "react";
function MainApp() {
    const { authed, loading } = AuthService();
    useEffect(() => {
        if(!loading && !authed) {
            alert("Please login!");
        }
    });
    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <PrivateRoute authed={authed} path="/app" exact component={App.App} />
            <PrivateRoute authed={authed} path="/app/user" component={App.UserAccount} />
            <PrivateRoute authed={authed} path="/app/test" component={App.TestPage} />
            <PrivateRoute authed={authed} path="/app/linkdrive" component={App.LinkGDrive} />
        </div>
    )
}

export default MainApp;
