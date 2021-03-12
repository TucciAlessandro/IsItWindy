import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import { Svg } from "../components/Svg";

const Container = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled(motion.h2)`
  display: flex;
  justify-content: center;
  margin: 0rem;
  align-items: center;
`;
const Home = () => {
  const [isWindyToggle, setIsWindyToggle] = useState();
  const isWindy = firebase
    .firestore()
    .collection("Easykite")
    .doc("zH5WIKrlR152IaQLYa2M");

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
  let y = useMotionValue(0);
  const yInput = [-100, 0, 100];
  const spring = useSpring(y);
  const background = useTransform(spring, yInput, [
    "linear-gradient(180deg, #ff5100 0%, rgb(211, 9, 40) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  if (isWindyToggle !== undefined) {
    isWindyToggle ? spring.set(80) : spring.set(-90);
  }
  return (
    <Container style={{ background }}>
      <Box>
        <Svg x={spring} xInput={yInput} />
      </Box>
      {/* <Text>CE VENTO</Text> */}
    </Container>
  );
};

export { Home };
