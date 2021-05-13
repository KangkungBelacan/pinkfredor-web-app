import "./App.css";
import Home from "./pages/Home";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
function App() {
    return (
        <Router>
            <Switch>
                <Route path="/" exact component={() => <Home poop={1} />} />
            </Switch>
        </Router>
    );
}

export default App;
