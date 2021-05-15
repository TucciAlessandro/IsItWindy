import styled, { keyframes } from "styled-components";
import { isInStandaloneMode, isIos } from "../utilities/utils";
import AppleShareIcon from "./AppleShareIcon";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  &:focus {
    outline: none;
  }

  background-color: white;
  border-radius: 50%;
  border: 1px solid white;
  /* padding: 1rem; */
  height: 40px;
  width: 40px;
  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
`;
const Modal = styled.div`
  position: absolute;
  margin-bottom: 4rem;
  z-index: 102;
  display: flex;
  width: 80%;
  height: 30%;
  bottom: 0;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 10px;
  background-color: white;
  animation: ${fadeIn} 0.5s ease-in;
`;

const ModalMainContent = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 300;
`;

const H4 = styled.h4`
  font-weight: 300;
`;
const H2 = styled.h2`
  font-weight: 600;
  letter-spacing: 1px;
`;

const PwaPrompt2 = () => {
  const [isShowing, setIsShowing] = useState(true);
  const shouldRender = isIos() && !isInStandaloneMode();

  const closeBanner = () => setIsShowing(false);

  return (
    <>
      {isShowing && shouldRender && (
        <Modal>
          <CloseButton onClick={closeBanner}>
            <FontAwesomeIcon size="2x" icon={faTimes} />
          </CloseButton>
          <H2>Install Application</H2>
          <ModalMainContent>
            <H4>
              Tap <AppleShareIcon modern /> then 'Add To Homescreen'
            </H4>
          </ModalMainContent>
        </Modal>
      )}
    </>
  );
};

export default PwaPrompt2;
