// import { Route } from "react-router-dom";
import PrivateRoute from "../components/generic/PrivateRoute";
import * as App from "./App";
import { AuthService } from "../services/Auth";
import { Redirect } from "react-router";
function MainApp() {
    const { authed, loading } = AuthService();
    return loading ? (
        <div>Loading...</div>
    ) : authed ? (
        <div>
            <PrivateRoute authed={true} path="/app" exact component={App.App} />
            <PrivateRoute authed={true} path="/app/user" component={App.UserAccount} />
            <PrivateRoute authed={true} path="/app/test" component={App.TestPage} />
            <PrivateRoute authed={true} path="/app/linkdrive" component={App.LinkGDrive} />
        </div>
    ) : (
        <Redirect to="/" />
    );
}

export default MainApp;
