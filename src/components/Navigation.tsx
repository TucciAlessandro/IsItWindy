import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { firebase } from "./../realtimedb/firebase";
import useLocalStorage from "../hooks/useLocalStorage";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
    display: "block",
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
    transitionEnd: {
      display: "none",
    },
  },
};

const ModifiedUl = styled(motion.ul)`
  margin: 0;
  padding: 0;
  padding: 25px;
  position: absolute;
  top: 100px;
  z-index: 1;
  width: 230px;
`;

export const Navigation = ({ toggle }: any) => {
  const history = useHistory();
  let user = firebase.auth().currentUser !== null;  
  
  const toHome = () => {
    toggle();
    history.push("/");
  };
  const toLogout = () => {
    toggle();
    firebase.auth().signOut();
    history.push("/");
  };
  const toAdmin = () => {
    toggle();
    
    history.push("/login");
  };
  const toLogin = () => {
    toggle();
    ;
    history.push("/login");
  };
  return (
    <ModifiedUl variants={variants}>
      <MenuItem redirect={toHome} route="HOME" i={3} key={3} />
      {!user && <MenuItem redirect={toLogin} route="LOGIN" i={2} key={2} />}
      {user && <MenuItem redirect={toAdmin} route="ADMIN" i={2} key={2} />}
      {user && <MenuItem redirect={toLogout} route="LOGOUT" i={1} key={1} />}
    </ModifiedUl>
  );
};
