import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MainApp from "./pages/MainApp";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/Auth" component={Auth} />
                <Route path="/app" component={MainApp} />
            </Switch>
        </Router>
    );
}

export default App;
