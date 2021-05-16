import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import * as App from "./App";
function MainApp() {
    return (
        <Router>
            <Switch>
                <Route path="/app" exact component={App.App} />
                <Route path="/app/user" component={App.UserAccount} />
            </Switch>
        </Router>
    );
}

export default MainApp;