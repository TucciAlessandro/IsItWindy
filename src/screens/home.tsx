import styled from "styled-components";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { Box } from "../components/Box";
import moment from "moment";
import { Svg } from "../components/Svg";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { WhatsApp } from "../components/WhatsApp";
import PwaPrompt2 from "../components/Modal";
import { useScreenSize } from "../hooks/useScreenSize";
import EasyKiteNuovo from "../images/EasykiteNuovo.jpg";
import { useFirebaseContext } from "../contexts/useFirebaseContext";

const Logo = styled.img`
  z-index: 2000;
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  margin-top: 0.5rem;
  margin-right: 0.5rem;
  width: 8rem;
`;
const Container = styled(motion.div)`
  height: 50vh;
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
  margin-top: 13rem;
`;
export const H3 = styled(motion.h3)`
  display: flex;
  justify-content: center;
  margin: 0rem;
  text-align: center;
  font-size: 22px;
  font-weight: 500;
  color: white;
  align-items: center;
`;
const H4 = styled(motion.h4)`
  display: flex;
  justify-content: center;
  font-size: 18px;
  margin: 0;
  font-weight: 300;
  color: white;
  align-items: center;
`;
interface TypeProps {
  typeIndex: number;
}
const Type = styled(motion.h1)<TypeProps>`
  width: 150px;
  height: 100px;
  color: white;
  font-size: 30px;
  font-weight: 300;

  text-align: center;
  position: absolute;
  top: calc(${(props) => props.typeIndex * 40}% - 150px / 2);
  left: calc(50% - 150px / 2);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Home = () => {
  const { getFirebaseInstance, getToken } = useFirebaseContext();
  const [isWindyToggle, setIsWindyToggle] = useState();
  const [lift, setLift] = useState();
  const [date, setDate] = useState();
  const { screenSize } = useScreenSize();
  const isMobile = screenSize === "small" || screenSize === "medium";
  const timestampToDate = (date: any) => {
    const { seconds } = date;
    const newDate = moment.unix(seconds);
    if (newDate) {
      const formattedTime = moment(newDate).calendar();
      return formattedTime;
    }
  };

  useEffect(() => {
    getToken();
  }, []);
  useEffect(() => {
    const isWindyDb = getFirebaseInstance()
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
  const yInput2 = [-100, 0, 100];
  const spring2 = useSpring(y);
  const background = useTransform(spring, yInput, [
    "linear-gradient(180deg, #ff5100 0%, rgb(211, 9, 40) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  const background2 = useTransform(spring2, yInput2, [
    "linear-gradient(180deg, rgb(211, 9, 40) 0%, #ff5100 100%)",
    "linear-gradient(180deg, rgb(68, 0, 255) 0%, #7700ff 100%)",
    "linear-gradient(180deg, rgb(3, 209, 0) 0%, rgb(230, 255, 0) 100%)",
  ]);
  // rgb(11, 139, 9) rgb(151, 9, 30)
  if (isWindyToggle !== undefined) {
    isWindyToggle ? spring.set(80) : spring.set(-90);
  }
  if (lift !== undefined) {
    lift ? spring2.set(80) : spring2.set(-90);
  }

  if (isWindyToggle === null) {
    spring.set(0);
    spring2.set(0);
  }

  const showMessage = lift || isWindyToggle;
  const getText = (
    isWindy: boolean | undefined,
    isLift: boolean | undefined
  ) => {
    return (
      <>
        {showMessage && (
          <H3
            initial={{ x: -20 }}
            animate={{ x: 0 }}
            transition={{ ease: "easeOut", duration: 1 }}
          >
            Meeting @ 7:30am in school
          </H3>
        )}
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
    <>
      <Container style={{ background }}>
        <Logo src={EasyKiteNuovo} />
        {isMobile && <PwaPrompt2 />}
        <a href="https://wa.me/+393423133553">
          <WhatsApp color="black" size="3x" icon={faWhatsapp} />
        </a>
        <Type typeIndex={0.4}>{"LESSONS"}</Type>
        <Box
          drag
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          whileDrag={{ scale: 1.2 }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          boxIndex={0.8}
        >
          <Svg x={spring} xInput={yInput} />
        </Box>
      </Container>
      <Container style={{ background: background2 }}>
        <Type typeIndex={1.38}>{"LIFTS"}</Type>
        <Box
          drag
          dragTransition={{ bounceStiffness: 600, bounceDamping: 10 }}
          whileDrag={{ scale: 1.2 }}
          dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          boxIndex={1.8}
        >
          <Svg x={spring2} xInput={yInput2} />
        </Box>
        <TextContainer>{getText(isWindyToggle, lift)}</TextContainer>
      </Container>
    </>
  );
};

export { Home };
