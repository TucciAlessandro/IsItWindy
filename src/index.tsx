import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";

import { App } from "./app";

ReactDOM.render(<App />, document.getElementById("root"));

serviceWorkerRegistration.register();
reportWebVitals();
