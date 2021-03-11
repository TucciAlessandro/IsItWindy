import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import styled from "styled-components";
import { Box } from "./Box";
import { Svg } from "./Svg";

const Container = styled(motion.div)`
  width: 100vw;
  height: 100vh;
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

  return (
    <Container style={{ background }}>
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
