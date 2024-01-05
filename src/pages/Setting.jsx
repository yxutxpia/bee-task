import styled from 'styled-components';
import SettingForm from '../features/setting/SettingForm';
import Heading from '../ui/Heading';
import PageLayout from '../ui/PageLayout';

const StyledSetting = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
  gap: 24px;

  @media only screen and (max-width: 1220px) {
    display: block;
  }
`;

function Setting() {
  return (
    <PageLayout>
      <Heading as="h1">Setting</Heading>
      <StyledSetting>
        <SettingForm />
      </StyledSetting>
    </PageLayout>
  );
}

export default Setting;
