import React, { useContext } from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import UserContext from "../../utilities/user";

const PrivateRoute = ({ component: Component, ...props }) => {
  const { user } = useContext(UserContext);
  const location = useLocation();

  return (
    <Route {...props}>
      {user ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/login", state: { from: location } }} />
      )}
    </Route>
  );
};

export default PrivateRoute;
