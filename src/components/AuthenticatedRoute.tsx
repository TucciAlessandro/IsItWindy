import { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import useLocalStorage from "../hooks/useLocalStorage";
import Login from "../screens/login";
import { UltimateAdmin } from "../screens/ultimateadmin";

interface AuthenticatedRouteProps {
  path: string;
  component?: React.ComponentType<any> | undefined;
}

const AuthenticatedRoute = ({ path, component }: AuthenticatedRouteProps) => {
  const history = useHistory();
  const [isLoggedIn] = useLocalStorage("login", "");
  const checkIfLogged = () => {
    if (!isLoggedIn) {
      history.push("/login");
    }
    if (isLoggedIn) {
      history.push("/admin");
    }
  };

  useEffect(() => {
    checkIfLogged();
  }, []);

  return <Route path={path} component={component}></Route>;
};

export { AuthenticatedRoute };
