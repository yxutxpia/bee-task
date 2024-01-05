import styled from 'styled-components';
import PageLayout from '../ui/PageLayout';
import Heading from '../ui/Heading';
import SignOutForm from '../features/setting/SignOutForm';

const StyledSignOut = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
  gap: 24px;
`;

function SignOut() {
  return (
    <PageLayout>
      <Heading as="h1">Sign out</Heading>
      <StyledSignOut>
        <SignOutForm />
      </StyledSignOut>
    </PageLayout>
  );
}

export default SignOut;
