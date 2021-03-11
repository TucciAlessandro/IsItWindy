import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const NavBar = styled.nav`
  height: 3rem;
  width: 100vw;
  display: flex;
  position: absolute;
  justify-content: space-between;
  background-color: transparent;
  border-bottom: 2px solid red;
`;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%);
`;

const Ball = styled(motion.div)`
  border-radius: 50%;
  margin: 1rem;
  height: 150px;
  width: 150px;
  background-color: red;
`;

const Home = () => {
  const [isWindyToggle, setIsWindyToggle] = useState();
  const isWindy = firebase
    .firestore()
    .collection("Easykite")
    .doc("zH5WIKrlR152IaQLYa2M");

  let result = undefined;

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");

    isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsWindyToggle(value.isWindy);
    });
  }, []);
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 50], [0, 1]);
  const crossPathA = useTransform(x, [-10, -30], [0, 1]);
  const crossPathB = useTransform(x, [-10, -50], [0, 1]);

  return (
    <Container>
      <motion.div className="box">
        <svg className="progress-icon" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </svg>
      </motion.div>
    </Container>
  );
};

export { Home };
