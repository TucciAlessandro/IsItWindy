import { motion } from "framer-motion";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

const ModifiedLi = styled(motion.li)`
  margin: 0;
  padding: 0;
  list-style: none;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

// const Placeholder = styled.div`
//   border-radius: 5px;
//   width: 200px;
//   height: 20px;
//   flex: 1;
// `;
const ButtonItem = styled.button`
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 300;
  letter-spacing: 0.3rem;
  width: 200px;
  height: 40px;
  flex: 1;
`;

const colors = ["#FF008C", "#D309E1", "#9C1AFF", "#7700FF", "#4400FF"];

export const MenuItem = ({ i, route, redirect }: any) => {
  const style = { border: `2px solid ${colors[i]}` };
  return (
    <ModifiedLi
      variants={variants}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <ButtonItem onClick={redirect} style={style}>
        {route}
      </ButtonItem>
    </ModifiedLi>
  );
};
