import styled from 'styled-components';
import PageLayout from '../ui/PageLayout';
import Heading from '../ui/Heading';
import SignOutForm from '../features/setting/SignOutForm';
import PageContainer from '../ui/PageContainer';

function SignOut() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Sign out</Heading>
        <SignOutForm />
      </PageContainer>
    </PageLayout>
  );
}

export default SignOut;
