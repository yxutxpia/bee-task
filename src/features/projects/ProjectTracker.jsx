import styled from 'styled-components';
import { useProjects } from '../../hooks/useProjects';
import Heading from '../../ui/Heading';
import { useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { HiMiniChartPie } from 'react-icons/hi2';

const StyledProjectTracker = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: calc(29px + 16px);
  padding: 24px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const HeadingWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-primary-500);
  }
`;

function ProjectTracker() {
  const { projects, isLoading } = useProjects();
  const chartEl = useRef(null);

  const completeProjects = projects?.filter(project => project.is_finished);
  const inProgressProjects = projects?.filter(
    project =>
      !project.is_finished && project.tasks.filter(task => task.complete).length
  );
  const notStartedProjects = projects?.filter(
    project =>
      project.tasks.length ===
        project.tasks.filter(task => !task.complete).length &&
      !project.is_finished
  );

  const [options, setOptions] = useState({
    color: ['#ECE3CE', '#80BCBD', '#FFC436'],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '5%',
      left: 'center',
      selectedMode: false,
    },
    series: [
      {
        name: 'Status',
        type: 'pie',
        radius: ['40%', '70%'],
        center: ['50%', '70%'],
        startAngle: 180,
        label: {
          show: true,
          formatter(param) {
            return param.name + ' (' + param.percent * 2 + '%)';
          },
        },
        data: [
          { value: notStartedProjects.length, name: 'Not started' },
          { value: inProgressProjects.length, name: 'In progress' },
          { value: completeProjects.length, name: 'Finished' },
          {
            value:
              notStartedProjects.length +
              inProgressProjects.length +
              completeProjects.length,
            itemStyle: {
              color: 'none',
              decal: {
                symbol: 'none',
              },
            },
            label: {
              show: false,
            },
          },
        ],
      },
    ],
  });

  useEffect(() => {
    if (chartEl.current) {
      const chart = echarts.init(chartEl.current);

      chart.setOption(options);
    }
  }, [options, chartEl]);

  if (isLoading) return null;

  return (
    <StyledProjectTracker>
      <HeadingWrapper>
        <Heading as="h4">Project tracker</Heading>
        <HiMiniChartPie />
      </HeadingWrapper>
      <div>
        <div ref={chartEl} style={{ width: '100%', height: '400px' }}></div>
      </div>
    </StyledProjectTracker>
  );
}

export default ProjectTracker;
