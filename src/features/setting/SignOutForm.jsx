import { useState } from 'react';
import styled, { css } from 'styled-components';
import { BsFillCheckSquareFill, BsSquare } from 'react-icons/bs';
import toast from 'react-hot-toast';
import Button from '../../ui/Button';

const StyledSignOutForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);

  & > button {
    align-self: flex-end;
  }
`;

const Emoji = styled.div`
  background-color: var(--color-red-100);
`;

const Information = styled.div`
  padding: 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-primary-50);
  transition: background-color var(--transition);

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & li {
    line-height: 1.5;
  }
`;

const Checkbox = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 8px;

  & > svg {
    width: 16px;
    height: 16px;
  }

  ${props =>
    props.confirm &&
    css`
      & > svg {
        color: var(--color-primary-500);
      }
    `}
`;

function SignOutForm() {
  const [confirm, setConfirm] = useState(false);

  function handleClick() {
    if (!confirm) {
      toast.error('필수 항목을 체크해주세요');
    }
  }

  return (
    <StyledSignOutForm>
      <Emoji></Emoji>
      <Information>
        <ul>
          <li>① 탈퇴시 BeeTask에 등록된 모든 자료는 즉시 삭제됩니다.</li>
          <li>② 탈퇴 후 자료는 절대 복구할 수 없습니다.</li>
          <li>
            ③ 탈퇴 후에도 기존의 이메일로 서비스에 재가입할 수 있으며, 아이디도
            재사용이 가능합니다.
          </li>
        </ul>
      </Information>
      <Checkbox
        confirm={confirm}
        onClick={() => {
          setConfirm(confirm => !confirm);
        }}
      >
        {confirm ? <BsFillCheckSquareFill /> : <BsSquare />}
        <span>상기 내용을 모두 확인했습니다 *</span>
      </Checkbox>
      <Button type="danger" onClick={handleClick}>
        탈퇴하기
      </Button>
    </StyledSignOutForm>
  );
}

export default SignOutForm;
