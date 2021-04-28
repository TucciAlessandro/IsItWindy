import React, { useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./screens/home";
// import { Admin } from "./screens/admin";
import { createGlobalStyle } from "styled-components";
import { Navbar } from "./components/Navbar";
import Login from "./screens/login";

import { getToken } from "./realtimedb/firebase";
import { UltimateAdmin } from "./screens/ultimateadmin";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";

const GlobalStyles = createGlobalStyle`
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

`;
const App = () => {
  useEffect(() => {
    getToken();
  }, []);

  return (
    <React.StrictMode>
      <GlobalStyles />
      <BrowserRouter>
        <Navbar />
        <Switch>
          <AuthenticatedRoute exact path="/login" component={Login} />
          <AuthenticatedRoute path="/admin" component={UltimateAdmin} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </React.StrictMode>
  );
};

export { App };
