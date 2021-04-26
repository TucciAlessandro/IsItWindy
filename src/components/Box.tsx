import { motion } from "framer-motion";
import styled from "styled-components";

interface BoxProps {
  boxIndex: number;
}
const Box = styled(motion.div)<BoxProps>`
  background: white;
  border-radius: 30px;
  width: 150px;
  height: 150px;
  position: absolute;
  top: calc(${(props) => props.boxIndex * 40}% - 150px / 2);
  left: calc(50% - 150px / 2);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export { Box };
