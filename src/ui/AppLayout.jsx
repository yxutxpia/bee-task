import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import Header from './Header';
import Sidebar from './Sidebar';

const StyledAppLayout = styled.div`
  height: 100dvh;
  display: grid;
  padding: 0 32px 32px 0;
  grid-template-columns: 320px 1fr;
  grid-template-rows: auto 1fr;

  @media only screen and (max-width: 1035px) {
    grid-template-columns: 1fr;
    padding: 32px;
    padding-top: 0;
  }

  @media only screen and (max-width: 720px) {
    padding: 24px;
    padding-top: 0;
  }
`;

const Main = styled.main`
  width: calc(1024px + 32px * 2);
  padding: 32px;
  border-radius: var(--round-lg);
  background-color: var(--color-pale-purple-100);
  transition: background-color var(--transition);
  overflow-y: scroll;

  @media only screen and (max-width: 1455px) {
    width: 100%;
  }

  @media only screen and (max-width: 720px) {
    padding: 0;
    border-radius: unset;
    background-color: unset;
  }
`;

const Container = styled.div``;

function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
