import { motion } from "framer-motion";
import { MenuItem } from "./MenuItem";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const variants = {
  open: {
    transition: { staggerChildren: 0.07, delayChildren: 0.2 },
  },
  closed: {
    transition: { staggerChildren: 0.05, staggerDirection: -1 },
  },
};

const ModifiedUl = styled(motion.ul)`
  margin: 0;
  padding: 0;
  padding: 25px;
  position: absolute;
  top: 100px;
  width: 230px;
`;

export const Navigation = ({ toggle }: any) => {
  const history = useHistory();

  const toHome = () => {
    toggle();
    history.push("/");
  };
  const toAdmin = () => {
    toggle();
    history.push("/admin");
  };
  return (
    <ModifiedUl variants={variants}>
      <MenuItem redirect={toHome} route="HOME" i={1} key={1} />
      <MenuItem redirect={toAdmin} route="LOGIN" i={2} key={2} />
    </ModifiedUl>
  );
};
