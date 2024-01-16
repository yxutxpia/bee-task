import styled from 'styled-components';
import ProjectCounts from './ProjectCounts';
import TasksCounts from './TasksCounts';
import Achievments from './Achievments';
import PointsCard from './PointsCard';

const StyledSummaryRow = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column: 1 / -1;
  gap: 24px;

  @media only screen and (max-width: 1210px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media only screen and (max-width: 720px) {
    gap: 16px;
  }
`;

function SummaryRow() {
  return (
    <StyledSummaryRow>
      <TasksCounts />
      <ProjectCounts />
      <PointsCard />
      <Achievments />
    </StyledSummaryRow>
  );
}

export default SummaryRow;
