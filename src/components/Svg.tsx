import { motion, MotionValue, useTransform } from "framer-motion";
import styled from "styled-components";

interface SvgProps {
  x: MotionValue<number>;
  xInput: number[];
}

const StyledSvg = styled.svg`
  width: 80%;
  height: 80%;
`;
const Svg = ({ x, xInput }: SvgProps) => {
  const color = useTransform(x, xInput, [
    "rgb(211, 9, 40)",
    "rgb(68, 0, 255)",
    "rgb(3, 209, 0)",
  ]);
  const tickPath = useTransform(x, [10, 50], [0, 1]);
  const crossPathA = useTransform(x, [-10, -30], [0, 1]);
  const crossPathB = useTransform(x, [-10, -50], [0, 1]);

  return (
    <StyledSvg viewBox="0 0 50 50">
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
    </StyledSvg>
  );
};

export { Svg };
