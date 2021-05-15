import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { firebase } from "./../realtimedb/firebase";

interface AuthenticatedRouteProps {
  path: string;
  component?: React.ComponentType<any> | undefined;
  exact?: boolean | undefined;
}

const AuthenticatedRoute = ({
  path,
  component,
  exact,
}: AuthenticatedRouteProps) => {
  const isLoggedIn = firebase.auth().currentUser !== null;
  console.log(firebase.auth().currentUser);
  useEffect(() => {
    console.log(isLoggedIn);
  });
  if (isLoggedIn) {
    console.log("logged in");
    return <Route exact={exact} path={path} component={component}></Route>;
  }

  return <Redirect exact to={"/login"} />;
};

export { AuthenticatedRoute };
