// import { Route } from "react-router-dom";
import PrivateRoute from "../components/generic/PrivateRoute";
import * as App from "./App";
import {AuthService} from "../services/Auth";
function MainApp() {
    const {authed, loading} = AuthService();
    return (
        <div>
            {/* <PrivateRoute authed={true} path="/app" exact component={App.App} />
            <PrivateRoute authed={true} path="/app/user" component={App.UserAccount} />
            <PrivateRoute authed={true} path="/app/test" component={App.TestPage} />
            <PrivateRoute authed={true} path="/app/linkdrive" component={App.LinkGDrive} /> */}
            {loading ? "isLoading" : "loading done!"}<br />
            {`authed is ${authed}`}<br />
        </div>
    );
}

export default MainApp;
