import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import styled from "styled-components";
import { Box } from "./Box";
import { Svg } from "./Svg";

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
`;

const Type = styled(motion.h1)`
  display: flex;
  justify-content: center;
  margin: 0rem;
  height: 30vh;
  text-align: center;
  font-size: 30px;
  font-weight: 300;
  color: white;
  align-items: center;
`;

export type FramerDragEvent = MouseEvent | TouchEvent | PointerEvent;
interface SliderProps {
  onDragEnd: (evt: FramerDragEvent, info: PanInfo) => void;
  type: string;
}

export const Slider = ({ onDragEnd, type }: SliderProps) => {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const background = useTransform(x, xInput, [
    "linear-gradient(180deg, #ff5100 0%, rgb(211, 9, 40) 100%)",
    "linear-gradient(180deg, #7700ff 0%, rgb(68, 0, 255) 100%)",
    "linear-gradient(180deg, rgb(230, 255, 0) 0%, rgb(3, 209, 0) 100%)",
  ]);

  return (
    <Container style={{ background }}>
      <Type>{type}</Type>
      <Box
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onDragEnd}
      >
        <Svg x={x} xInput={xInput} />
      </Box>
    </Container>
  );
};
