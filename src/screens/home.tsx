import { firebase } from "./../realtimedb/firebase";
import styled from "styled-components";
import { motion, useMotionValue, useTransform } from "framer-motion";
import React, { useEffect, useState } from "react";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%);
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

  return <Container></Container>;
};

export { Home };
