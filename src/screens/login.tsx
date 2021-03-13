import firebase from "firebase";
import { useState } from "react";

import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";

const Box = styled(motion.div)`
  background: white;
  border-radius: 30px;
  width: 300px;
  height: 300px;
  z-index: 10;
  /* position: absolute; */
  top: calc(50% - 150px / 2);
  left: calc(50% - 150px / 2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  border: 2px solid red;
  border-radius: 12px;
  outline: none;
  padding: 12px 3px 12px 8px;
  font-size: 16px;
  z-index: 100;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Username = styled.h1`
  display: flex;
  font-weight: 300;
  font-size: 18px;
  justify-content: center;
  align-items: center;
`;
const Password = styled.h1`
  display: flex;
  font-weight: 300;
  font-size: 18px;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: 1px solid red;
  border-radius: 0.25rem;
  width: 100%;
  margin-top: 1rem;
  padding: 8px;
  font-size: 16px;
  display: flex;
  font-weight: 300;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

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

const Container = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const history = useHistory();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const background =
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)";

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
    <Container style={{ background }}>
      <Box>
        <form onSubmit={handleSubmit}>
          <Username>Write ur email</Username>
          <Input
            value={username}
            onChange={(evt) => setUserName(evt.target.value)}
          ></Input>
          <Password>Write ur password</Password>
          <Input
            value={password}
            type="password"
            onChange={(evt) => setPassword(evt.target.value)}
          ></Input>
          <Button type="submit">LOGIN</Button>
          {error && error}
        </form>
      </Box>
    </Container>
  );
}

export default Login;
