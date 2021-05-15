import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MainApp from "./pages/MainApp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Load FontAwesome Library
import { library } from "@fortawesome/fontawesome-svg-core";
import * as solid_svg_icons from "@fortawesome/free-solid-svg-icons";
import * as brands_svg_icons from "@fortawesome/free-brands-svg-icons";
const solid_list = Object.keys(solid_svg_icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => {
        return (solid_svg_icons as any)[icon];
    });
const brands_list = Object.keys(brands_svg_icons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => {
        return (brands_svg_icons as any)[icon];
    });
library.add(...brands_list);
library.add(...solid_list);

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
