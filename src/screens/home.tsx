import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import moment from "moment";
import { Svg } from "../components/Svg";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WhatsApp } from "../components/WhatsApp";

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
  height: 80%;
  width: 80%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 15rem;
`;
export const H1 = styled(motion.h1)`
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

  const timestampToDate = (date: any) => {
    const { seconds } = date;
    const newDate = moment.unix(seconds);
    if (newDate) {
      const formattedTime = moment(newDate).calendar();
      return formattedTime;
    }
  };

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
  console.log(date);
  let y = useMotionValue(0);
  const yInput = [-100, 0, 100];
  const spring = useSpring(y);
  const background = useTransform(spring, yInput, [
    "linear-gradient(180deg, #ff5100 0%, rgb(211, 9, 40) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  if (isWindyToggle !== undefined) {
    isWindyToggle || lift ? spring.set(80) : spring.set(-90);
  }

  if (isWindyToggle === null) {
    spring.set(0);
  }

  const getText = (
    isWindy: boolean | undefined,
    isLift: boolean | undefined
  ) => {
    let mainText = "";
    if (isWindyToggle === null && lift === null) {
      mainText = "Still needs to be updated today, try again in a few minutes.";
    }
    if (isWindyToggle && lift) {
      mainText = "Lessons and lifts are on!";
    }
    if (
      !isWindyToggle &&
      !lift &&
      isWindyToggle !== undefined &&
      isWindyToggle !== null
    ) {
      mainText = "Lessons and lifts are off!";
    }
    if (!lift && isWindyToggle) {
      mainText =
        "Lessons are on, however lifts are off due to not enough wind!";
    }
    if (lift && !isWindyToggle) {
      mainText = "Lifts are on, however lessons are off due to strong wind!";
    }
    return (
      <>
        <H1
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          {mainText}
        </H1>
        <H4
          initial={{ x: -20 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut", duration: 1 }}
        >
          {date && `Last update - ${timestampToDate(date)} `}
        </H4>
      </>
    );
  };

  return (
    <Container style={{ background }}>
      <a href="https://wa.me/+393423133553">
        <WhatsApp color="black" size="3x" icon={faWhatsapp} />
      </a>
      <Box
        drag
        dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
        whileDrag={{ scale: 1.2 }}
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        boxIndex={1}
      >
        <Svg x={spring} xInput={yInput} />
      </Box>
      <TextContainer>{getText(isWindyToggle, lift)}</TextContainer>
    </Container>
  );
};

export { Home };
