// PrivateRoute.tsx

import React, { ComponentType, FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";

interface PrivateRouteProps extends RouteProps {
  component: ComponentType<FC>;
  isLoggedIn: boolean;
  redirectTo?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  component: Component,
  isLoggedIn,
  redirectTo = "/login",
  ...rest
}) => (
  <Route
    {...rest}
    render={(props) =>
      isLoggedIn ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{ pathname: redirectTo, state: { from: props.location } }}
        />
      )
    }
  />
);

export default PrivateRoute;
