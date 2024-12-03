import React, { Children } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Home from '../pages/Home';

const PrivateRoute = ({ element: Component, user }) => {
  // const user = props.user
  console.log("private roouter", user);
  return user?.token ? <Component /> : <Navigate to="/login" />
  // return user ? console.log("if condition") : console.log("else condition ")
};

export default PrivateRoute;

