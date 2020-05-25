import React, { useContext } from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import UserContext from '../../utilities/user';


const PrivateRoute = ({ component: Component, ...props }) => {
  const user = useContext(UserContext);
  const location = useLocation();

  return (
    <Route {...rest}>
      {
        user.user
          ? <Redirect to={{ pathname: '/login', state={ from: location } }} />
          : <Component {...props} />
      }
    </Route>
  );
};

export default PrivateRoute;