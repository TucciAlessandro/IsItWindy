import {
  motion,
  useMotionValue,
  useTransform,
  PanInfo,
} from "framer-motion";
import styled from "styled-components";
import { Box } from "./Box";
import { Svg } from "./Svg";

interface ContainerProps {
  isWindy: boolean | undefined;
}

const Container = styled(motion.div)<ContainerProps>`
  width: 100vw;
  height: 100vh;
  background: ${(props) =>
    props.isWindy
      ? "linear-gradient(rgb(212, 228, 114) 0%, rgb(31, 187, 114) 100%);"
      : "linear-gradient(rgb(245, 77, 81) 0%, rgb(201, 9, 89) 100%)"};
  transition: background-color 2s ease-in;
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

export type FramerDragEvent = MouseEvent | TouchEvent | PointerEvent;
interface SliderProps {
  onLiftDragEnd: (evt: FramerDragEvent, info: PanInfo) => void;
  onLessonDragEnd: (evt: FramerDragEvent, info: PanInfo) => void;
  type1: string;
  type2: string;
  isWindy?: boolean | undefined;
}

export const Slider = ({
  onLiftDragEnd,
  onLessonDragEnd,
  type1,
  type2,
  isWindy,
}: SliderProps) => {
  const x = useMotionValue(0);
  const xInput = [-100, 0, 100];
  const x2 = useMotionValue(0);
  const x2Input = [-100, 0, 100];

  return (
    <Container isWindy={isWindy}>
      <Type typeIndex={0.6}>{type1}</Type>
      <Box
        boxIndex={1}
        style={{ x }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onLessonDragEnd}
      >
        <Svg x={x} xInput={xInput} />
      </Box>
      <Type typeIndex={1.42}>{type2}</Type>
      <Box
        boxIndex={1.8}
        style={{ x: x2 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={onLiftDragEnd}
      >
        <Svg x={x2} xInput={x2Input} />
      </Box>
    </Container>
  );
};
