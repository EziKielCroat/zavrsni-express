import styled from "styled-components";
import ReactDOM from "react-dom";

// Styled components
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  max-height: 600px;
  width: 600px;
  overflow-y: auto;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  margin-left: 50px;
`;

const Modal = ({ title, children, onClose }) => {
  return ReactDOM.createPortal(
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          <h2>{title}</h2>
          <CloseButton onClick={onClose}>Close</CloseButton>
        </ModalHeader>
        <div>{children}</div>
      </ModalContent>
    </ModalOverlay>,
    document.getElementById("modal-root")
  );
};

export default Modal;
