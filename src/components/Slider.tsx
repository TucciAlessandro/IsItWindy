import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import styled from "styled-components";
import { Box } from "./Box";

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
`;

const Svg = styled.svg`
  width: 80%;
  height: 80%;
`;

export type FramerDragEvent = MouseEvent | TouchEvent | PointerEvent;
interface SliderProps {
  onDragEnd: (evt: FramerDragEvent, info: PanInfo) => void;
}

export const Slider = ({ onDragEnd }: SliderProps) => {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff008c 0%, rgb(211, 9, 225) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 225)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 50], [0, 1]);
  const crossPathA = useTransform(x, [-10, -30], [0, 1]);
  const crossPathB = useTransform(x, [-10, -50], [0, 1]);

  return (
    <Container style={{ background }}>
      <Box
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
      >
        <Svg className="progress-icon" viewBox="0 0 50 50">
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M 0, 20 a 20, 20 0 1,0 40,0 a 20, 20 0 1,0 -40,0"
            style={{ translateX: 5, translateY: 5 }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M14,26 L 22,33 L 35,16"
            strokeDasharray="0 1"
            style={{ pathLength: tickPath }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M17,17 L33,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathA }}
          />
          <motion.path
            fill="none"
            strokeWidth="2"
            stroke={color}
            d="M33,17 L17,33"
            strokeDasharray="0 1"
            style={{ pathLength: crossPathB }}
          />
        </Svg>
      </Box>
    </Container>
  );
};
