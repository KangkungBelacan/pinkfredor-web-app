// import { Component } from "react";
import { Redirect, Route } from "react-router-dom";

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
