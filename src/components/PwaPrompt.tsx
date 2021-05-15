import usePWA from "../hooks/usePwa";
import styled from "styled-components";

const StyledButton = styled.button`
  z-index: 10000;
  position: absolute;
`;
const PwaPrompt = () => {
  const { isStandalone, isInstallPromptSupported, promptInstall } = usePWA();

  const onClickInstall = async () => {
    const didInstall = await promptInstall();
    if (didInstall) {
      // User accepted PWA install
    }
  };

  const renderInstallButton = () => {
    // if (isInstallPromptSupported && !isStandalone)
    return (
      <StyledButton onClick={onClickInstall}>Prompt PWA Install</StyledButton>
    );
    // return null;
  };

  return (
    <div>
      <h2>PWA Infos</h2>
      <p>
        Is Install Prompt Supported ?{" "}
        {isInstallPromptSupported ? "true" : "false"}
      </p>
      <p>Is Standalone ? {isStandalone ? "true" : "false"}</p>
      {renderInstallButton()}
    </div>
  );
};

export default PwaPrompt;
