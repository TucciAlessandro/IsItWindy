import { motion } from "framer-motion";
import styled from "styled-components";

const ModalDiv = styled(motion.div)`
  background: white;
  border-radius: 30px;
  position: absolute;
  margin: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  width: 80%;

  box-shadow: 10px 10px 30px #f0f0f0, -10px -10px 30px #f0f0f0;
  height: 20%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
`;

const Button = styled(motion.button)`
  border: 1px solid #4400ff;
  border-radius: 0.25rem;
  background: white;
  margin-bottom: 1rem;
  width: 30%;
  /* margin-top: 1rem; */
  padding: 8px;
  font-size: 16px;
  display: flex;
  font-weight: 300;
  text-align: center;
  font-size: 18px;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

interface ModalProps {
  onClick: () => void;
  text: string;
}

const Modal = ({ onClick, text }: ModalProps) => {
  return (
    <ModalDiv
      initial={{ x: -20 }}
      animate={{ x: 0 }}
      transition={{ ease: "easeInOut", duration: 2 }}
    >
      <h1>{text}</h1>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          Wrong
        </Button>
        <Button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClick}
        >
          Ok
        </Button>
      
    </ModalDiv>
  );
};

export { Modal };
