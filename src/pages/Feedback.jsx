import FeedbackContainer from '../features/feedback/FeedbackContainer';
import Heading from '../ui/Heading';
import PageContainer from '../ui/PageContainer';
import PageLayout from '../ui/PageLayout';

function Feedback() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Feedback</Heading>
        <FeedbackContainer />
      </PageContainer>
    </PageLayout>
  );
}

export default Feedback;
