import { Component } from "react";
import { Redirect, Route } from "react-router-dom";
const PrivateRoute = (component: Component, authed: boolean, ...rest: any) => {
    return (
        <Route
            {...rest}
            render={(props: any) =>
                authed === true ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{ pathname: "/", state: { from: props.location } }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
