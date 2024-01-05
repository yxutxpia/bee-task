import styled from 'styled-components';
import PageLayout from '../ui/PageLayout';
import Heading from '../ui/Heading';
import ProfileForm from '../features/profiles/ProfileForm';
import ProfileCard from '../features/profiles/ProfileCard';
import ProfileMessageList from '../features/profiles/ProfileMessageList';
import ProfileMessageInform from '../features/profiles/ProfileMessageInform';
import PageContainer from '../ui/PageContainer';

const StyledProfile = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
  gap: 24px;

  @media only screen and (max-width: 1220px) {
    display: block;
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

function Profile() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Profile</Heading>
        {/* <StyledProfile> */}
        <div>
          <ProfileCard />
          {/* <ProfileMessageInform /> */}
          <ProfileForm />
          <ProfileMessageList />
        </div>
        {/* </StyledProfile> */}
      </PageContainer>
    </PageLayout>
  );
}

export default Profile;
