import styled from 'styled-components';

const StyledPageContainer = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
  gap: 24px;

  & header {
    grid-column: 1 / 2;
  }

  & > div {
    display: flex;
    flex-direction: column;
    grid-column: 1 / 2;
    gap: ${props => props.gap && `${props.gap}px`};
  }

  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

function PageContainer({ children, gap = 24 }) {
  return <StyledPageContainer gap={gap}>{children}</StyledPageContainer>;
}

export default PageContainer;
