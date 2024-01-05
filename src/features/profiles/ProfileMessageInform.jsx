import styled from 'styled-components';

const StyledProfileMessageInform = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  & > ul {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  & li {
    line-height: 1.5;
    transition: color var(--transition);
  }
`;

function ProfileMessageInform() {
  return (
    <StyledProfileMessageInform>
      <ul>
        <li>&bull; 메시지는 작성한 당사자와 계정주만 열람 가능합니다.</li>
        <li>
          &bull; 계정주는 수신한 모든 메시지를, 작성자는 본인이 작성한 메시지만
          조회할 수 있습니다.
        </li>
      </ul>
    </StyledProfileMessageInform>
  );
}

export default ProfileMessageInform;
