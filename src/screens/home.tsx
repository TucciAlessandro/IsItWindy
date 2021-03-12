import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
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
  let x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff5100 0%, rgb(211, 9, 40) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  useEffect(
    () =>
      x.onChange((latest) => {
        console.log(latest);
      }),
    []
  );
  isWindyToggle ? x.set(80) : x.set(-90);
  return (
    <Container style={{ background }}>
      <Box
      
      >
        <Svg x={x} xInput={xInput} />
      </Box>
      {/* <Text>CE VENTO</Text> */}
    </Container>
  );
};

export { Home };
