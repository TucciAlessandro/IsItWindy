
import firebase from "firebase";
import { useState } from "react";
import { useHistory } from "react-router-dom";

// Configure Firebase.
// const config = {
//   apiKey: process.env.REACT_APP_FIREBASE,
//   authDomain: "easykite-c750e.firebaseapp.com",
//   // ...
// };
// firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: "popup",
  // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: "/admin",
  // We will display Google and Facebook as auth providers.
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
  ],
};

function Login() {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    try {
      await firebase.auth().signInWithEmailAndPassword(username, password);
      history.push("/admin");
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <div>
      <h1>My App</h1>
      <p>Please sign-in:</p>
      {/* <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} /> */}

      <form onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(evt) => setUserName(evt.target.value)}
        ></input>
        <input
          value={password}
          type="password"
          onChange={(evt) => setPassword(evt.target.value)}
        ></input>
        <button type="submit">LOGIN</button>
        {error && error}
      </form>
    </div>
  );
}

export default Login;
