import "./App.css";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import MainApp from "./pages/MainApp";
import Help from "./pages/Help"
import Playground from "./pages/Playground";

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Roboto font for material-ui
import '@fontsource/roboto';

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
                <Route path="/help" component={Help} />
                <Route path="/Playground" component={Playground} />
            </Switch>
        </Router>
    );
}

export default App;
