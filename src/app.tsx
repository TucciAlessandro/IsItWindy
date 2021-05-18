import React, { useEffect } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./screens/home";
import { createGlobalStyle } from "styled-components";
import { Navbar } from "./components/Navbar";
import Login from "./screens/login";

import { UltimateAdmin } from "./screens/ultimateadmin";
import { AuthenticatedRoute } from "./components/AuthenticatedRoute";
import {
  FirebaseContextProvider,
  useFirebaseContext,
} from "./contexts/useFirebaseContext";

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
  return (
    <React.StrictMode>
      <FirebaseContextProvider>
        <GlobalStyles />
        <BrowserRouter>
          <Navbar />
          <Switch>
            <Route exact path="/login" component={Login} />
            <AuthenticatedRoute path="/admin" component={UltimateAdmin} />
            <Route path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      </FirebaseContextProvider>
    </React.StrictMode>
  );
};

export { App };
