import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import { Svg } from "../components/Svg";

const Container = styled(motion.div)`
  height: 100vh;
  width: 100vw;
  z-index: 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(motion.div)`
  display: flex;
  height: 50%;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10rem;
`;
const H1 = styled(motion.h1)`
  display: flex;
  justify-content: center;
  margin: 0rem;
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  color: white;
  align-items: center;
`;
const H4 = styled(motion.h1)`
  display: flex;
  justify-content: center;

  font-size: 18px;
  font-weight: 300;
  color: white;
  align-items: center;
`;
const Home = () => {
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [lift, setLift] = useState();
  const [date, setDate] = useState();

  useEffect(() => {
    const isWindyDb = firebase
      .firestore()
      .collection("Easykite")
      .doc("zH5WIKrlR152IaQLYa2M");

    isWindyDb.onSnapshot((doc) => {
      const value = doc.data();
      value && setIsWindyToggle(value.isWindy);
      value && setLift(value.lift);
      value && setDate(value.date);
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
      <TextContainer>
        {isWindyToggle && lift && (
          <>
            <H1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Lessons and lifts are on!{" "}
            </H1>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            ></H4>
          </>
        )}
        {!isWindyToggle && !lift && isWindyToggle !== undefined && (
          <>
            <H1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Lessons and lifts are off!{" "}
            </H1>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Contact the school for any problems
            </H4>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              last update was @
            </H4>
          </>
        )}
        {!lift && isWindyToggle && (
          <>
            <H1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Lessons are on, however lifts are off due to not enough wind!
            </H1>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              last update was @
            </H4>
          </>
        )}
        {/* {lift === undefined && isWindyToggle === undefined && (
          <H1
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            COME BACK LATER
          </H1>
        )} */}
      </TextContainer>
    </Container>
  );
};

export { Home };
