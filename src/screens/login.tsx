import firebase from "firebase";
import { useState } from "react";
import EasyKiteNuovo from "../images/EasykiteNuovo.jpg";
import { useHistory } from "react-router-dom";
import { motion } from "framer-motion";
import styled from "styled-components";
import useLocalStorage from "../hooks/useLocalStorage";
import { useScreenSize } from "../hooks/useScreenSize";

const Logo = styled.img`
  z-index: 2000;
  height: auto;
  width: 15rem;
`;

interface BoxProps {
  isMobile: boolean;
}
const Box = styled(motion.div)<BoxProps>`
  background: white;
  flex-direction: column;
  width: ${(props) => (props.isMobile ? "100%" : "30rem")};
  height: ${(props) => (props.isMobile ? "100%" : "35rem")};
  z-index: 10;
  /* box-shadow: 0 0 15px #242020; */

  box-shadow: 10px 10px 20px rgba(89, 118, 132, 1),
    -10px -10px 46px rgba(89, 118, 132, 1);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: auto;
  width: 15rem;
`;

const Input = styled.input`
  border: none;
  border-bottom: 4px solid rgba(89, 118, 132, 1);
  outline: none;
  padding: 12px 3px 12px 8px;
  font-size: 16px;
  z-index: 100;
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const Label = styled.h1`
  display: flex;
  font-weight: 400;
  letter-spacing: 0.1rem;
  font-size: 16px;
  margin-bottom: 0;
  margin-top:1rem;
  justify-content: flex-start;
  align-items: center;
`;
const Error = styled.h1`
  display: flex;
  font-weight: 400;
  letter-spacing: 0.1rem;
  font-size: 18px;
  margin-top: 0;
  width: 100%;
  justify-content: flex-start;
  align-items: center;
`;

const Button = styled(motion.button)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(89, 118, 132, 1);
  border-radius: 30px;
  margin-top: 3rem;
  margin-bottom: 1rem;
  padding: 16px;
  font-size: 16px;
  font-weight: 300;
  color: rgba(89, 118, 132, 1);
  font-size: 18px;
  z-index: 100;
`;

const Container = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

function Login() {
  const { screenSize } = useScreenSize();
  const isMobile = screenSize === "small" || screenSize === "medium";
  const [isLoggedIn, setIsloggedIn] = useLocalStorage("login", false);
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
      setIsloggedIn(true);
    } catch (error) {
      console.log(error);
      setError(error.message);
    }
  };
  return (
    <Container style={{ background }}>
      <Box isMobile={isMobile}>
        <Logo src={EasyKiteNuovo} />
        <Form onSubmit={handleSubmit}>
          <Label>Username</Label>
          <Input
            placeholder="Type your username"
            value={username}
            onChange={(evt) => setUserName(evt.target.value)}
          ></Input>
          <Label>Password</Label>
          <Input
            value={password}
            type="password"
            placeholder="Type your password"
            onChange={(evt) => setPassword(evt.target.value)}
          ></Input>
          <Button whileHover={{ scale: 1.1 }} type="submit">
            LOGIN
          </Button>
          <Error>{error && error}</Error>
        </Form>
      </Box>
    </Container>
  );
}

export default Login;
