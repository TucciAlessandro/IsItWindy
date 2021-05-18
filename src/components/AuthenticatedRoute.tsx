import { useEffect, useState } from "react";
import { Redirect, Route, useHistory } from "react-router-dom";
import { useFirebaseContext } from "../contexts/useFirebaseContext";

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
  const { isAuthenticated } = useFirebaseContext();

  if (isAuthenticated) {
    console.log("logged in");
    return <Route exact={exact} path={path} component={component}></Route>;
  }
  if (!isAuthenticated) {
    console.log("not auth");
  }

  return <Redirect exact to={"/login"} />;
};

export { AuthenticatedRoute };
