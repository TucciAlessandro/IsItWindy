import { useRef, useState } from "react";
import { motion, useCycle } from "framer-motion";
import { useDimensions } from "./use-dimension";

import styled from "styled-components";
import { MenuToggle } from "./MenuToggle";
import { Navigation } from "./Navigation";

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 40px 40px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(30px at 40px 40px)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

const Background = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  background: #fff;
`;

interface ModifiedNavbarProps {
  isOpen: boolean;
}
const ModifiedNavbar = styled(motion.nav)<ModifiedNavbarProps>`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 300px;
  z-index: ${(props) => (props.isOpen ? "20" : "")};
`;
const Navbar = () => {
  const [isOpen, setToggleOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(false);

  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const toggleOpen = () => {
    setToggleOpen(!isOpen);
  };

  return (
    <>
      <ModifiedNavbar
        isOpen={isOpen}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        // onAnimationComplete={() => handleAnimationComplete()}

        custom={height ?? 0}
        ref={containerRef}
      >
        <Background variants={sidebar} />
        <Navigation toggle={() => toggleOpen()} />
      </ModifiedNavbar>

      <MenuToggle
        animate={isOpen ? "open" : "closed"}
        toggle={() => toggleOpen()}
      />
    </>
  );
};

export { Navbar };
