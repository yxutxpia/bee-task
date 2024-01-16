import styled from 'styled-components';
import Heading from './Heading';
import Button from './Button';

import { HiOutlineExclamationCircle } from 'react-icons/hi2';

const StyledConfirmDelete = styled.div`
  width: 540px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 54px 32px;
  position: fixed;
  top: 50%;
  left: 50%;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transform: translate(-50%, -50%);

  & p {
    margin: 12px 0;
    padding: 24px 36px;
    font-size: 15px;
    text-align: center;
    line-height: 1.5;
    border-radius: var(--round-sm);
    background-color: var(--color-pale-purple-50);
  }

  & div {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  @media only screen and (max-width: 560px) {
    width: 90%;
  }
`;

const Icons = styled.div`
  width: 58px;
  height: 58px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-red-100);

  svg {
    width: 42px;
    height: 42px;
    color: var(--color-red-600);
  }
`;

const Overlay = styled.div`
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-modal-bg);
  z-index: 10000;
`;

function ConfirmDelete({ onDelete, onCloseModal, content }) {
  return (
    <Overlay onClick={onCloseModal}>
      <StyledConfirmDelete onClick={e => e.stopPropagation()}>
        <Icons>
          <HiOutlineExclamationCircle />
        </Icons>
        <Heading as="h2">Delete</Heading>
        <p>
          정말 이 {content} 삭제하시겠습니까?
          <br />이 작업은 취소할 수 없습니다.
        </p>
        <div>
          <Button type="danger" onClick={onDelete}>
            삭제하기
          </Button>
          <Button type="linear" onClick={onCloseModal}>
            취소하기
          </Button>
        </div>
      </StyledConfirmDelete>
    </Overlay>
  );
}

export default ConfirmDelete;
