import { cloneElement, createContext, useContext } from 'react';
import styled from 'styled-components';
import { useOutsideClick } from '../hooks/useOutsideClick';
import { createPortal } from 'react-dom';
import { HiXMark } from 'react-icons/hi2';

const StyledModal = styled.div``;

const Overlay = styled.div``;

const ModalContext = createContext();

function Modal({ children }) {
  return <ModalContext.Provider value={{}}>{children}</ModalContext.Provider>;
}

function Window({ children, name }) {
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <button onClick={close}>
          <HiXMark />
        </button>

        <div>{cloneElement(children, { onCloseModal: close })}</div>
      </StyledModal>
    </Overlay>,
    document.body
  );
}

Modal.Window = Window;

export default Modal;
