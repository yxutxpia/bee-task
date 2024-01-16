import styled from 'styled-components';
import Heading from '../ui/Heading';
import PointsRanking from '../features/dashboard/PointsRanking';
import PageLayout from '../ui/PageLayout';
import SummaryRow from '../features/dashboard/SummaryRow';
import MonthlyChart from '../features/dashboard/MonthlyChart';

const StyledDashboard = styled.div`
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-rows: auto auto auto;
  gap: 24px;

  @media only screen and (max-width: 720px) {
    gap: 16px;
  }
`;

function Dashboard() {
  return (
    <PageLayout>
      <Heading as="h1">Dashboard</Heading>
      <StyledDashboard>
        <SummaryRow />
        <MonthlyChart />
        <PointsRanking />
      </StyledDashboard>
    </PageLayout>
  );
}

export default Dashboard;
