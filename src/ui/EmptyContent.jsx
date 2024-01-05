import styled from 'styled-components';
import ButtonAddNew from './ButtonAddNew';

const StyledEmptyContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 120px 48px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);

  & > button {
    margin-top: 32px;
  }

  @media only screen and (max-width: 1220px) {
    width: 100%;
  }
`;

const Icon = styled.div`
  svg {
    width: 54px;
    height: 54px;
  }
`;

const Text = styled.p`
  margin-bottom: 24px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

function EmptyContent({ to, icon, subject, content }) {
  return (
    <StyledEmptyContent>
      <Icon>{icon}</Icon>
      <Text>작업 목록이 비어있습니다</Text>
      <ButtonAddNew subject={subject} to={to} shortened={false} />
    </StyledEmptyContent>
  );
}

export default EmptyContent;
