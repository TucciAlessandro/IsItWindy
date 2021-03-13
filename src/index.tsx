import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Home } from "./screens/home";
import { Admin } from "./screens/admin";
import { createGlobalStyle } from "styled-components";
import { Navbar } from "./components/Navbar";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

const GlobalStyles = createGlobalStyle`
/* @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap'); */
body {
  overflow: hidden;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  /* font-family: 'Poppins', sans-serif; */
}

`;

ReactDOM.render(
  <React.StrictMode>
    <GlobalStyles />
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/" component={Home} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorkerRegistration.register();
reportWebVitals();
