import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Box } from "../components/Box";
import { Svg } from "../components/Svg";
import { Modal } from "../components/Modal";

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

function toDateTime(secs: any) {
  var t = new Date(1970, 0, 1); // Epoch
  t.setSeconds(secs);
  return t;
}

const Home = () => {
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [lift, setLift] = useState();
  const [date, setDate] = useState();

  const timestampToDate = (date: any) => {
    console.log(date);
    const { seconds } = date;
    let unix_timestamp = seconds;

    if (unix_timestamp) {
      let newdate = new Date(unix_timestamp * 1000);

      // Hours part from the timestamp
      let hours = newdate.getHours();
      // Minutes part from the timestamp
      let minutes = "0" + newdate.getMinutes();
      // Seconds part from the timestamp
      let seconds = "0" + newdate.getSeconds();

      // Will display time in 10:30:23 format
      let formattedTime =
        hours + ":" + minutes.substr(-2) + ":" + seconds.substr(-2);

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

  return (
    <Container style={{ background }}>
      <Box>
        <Svg x={spring} xInput={yInput} />
      </Box>
      <TextContainer>
        {isWindyToggle === null && lift === null ? (
          <>
            <H1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Still needs to be updated today, try again in a few minutes.
            </H1>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              {date && `Last update was @ ${timestampToDate(date)} `}
            </H4>
          </>
        ) : (
          ""
        )}
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
            >
              {date && `Last update was @ ${timestampToDate(date)} `}
            </H4>
          </>
        )}
        {!isWindyToggle &&
          !lift &&
          isWindyToggle !== undefined &&
          isWindyToggle !== null && (
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
                {date && `Last update was @ ${timestampToDate(date)} `}
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
              {date && `Last update was @ ${timestampToDate(date)} `}
            </H4>
          </>
        )}
        {lift && !isWindyToggle && (
          <>
            <H1
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              Lifts are on, however lessons are off due to strong wind!
            </H1>
            <H4
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              transition={{ ease: "easeOut", duration: 1 }}
            >
              {date && `Last update was @ ${timestampToDate(date)} `}
            </H4>
          </>
        )}
      </TextContainer>
    </Container>
  );
};

export { Home };
