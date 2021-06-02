// import { Route } from "react-router-dom";
import PrivateRoute from "../components/generic/PrivateRoute";
import * as App from "./App";
import { AuthService } from "../services/Auth";
import { useEffect } from "react";

import { ThemeProvider } from "@material-ui/styles";
import DARK_THEME from "./../MaterialUITheme/MaterialTableMUITheme";

function MainApp() {
    const { authed, loading } = AuthService();
    useEffect(() => {
        if (!loading && !authed) {
            alert("Please login!");
        }
    });
    return loading ? (
        <div>Loading...</div>
    ) : (
        <div>
            <ThemeProvider theme={DARK_THEME}>
                <PrivateRoute authed={authed} path="/app" component={App.App} />
            </ThemeProvider>
        </div>
    );
}

export default MainApp;
