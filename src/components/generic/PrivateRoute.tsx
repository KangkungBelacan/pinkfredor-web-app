// import { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// A very complicated generic Element to create private routing
// Please refer to src/pages/MainApp.tsx to figure out how to use it
const PrivateRoute = ({ component, authed, ...rest }: any) => {
    let PassedinComponent = component as () => JSX.Element;
    return (
        <Route
            {...rest}
            render={(props: any) => {
                return authed === true ? (
                    <PassedinComponent {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                );
            }}
        />
    );
};

export default PrivateRoute;
