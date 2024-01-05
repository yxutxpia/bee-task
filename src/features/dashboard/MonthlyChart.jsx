import styled from 'styled-components';
import { MonthlyData } from '../../data/MonthlyData';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import Heading from '../../ui/Heading';
import { useDarkMode } from '../../context/DarkModeContext';

const StyledMonthlyChart = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  grid-column: 1 / 9;
  padding: 24px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  @media only screen and (max-width: 1290px) {
    grid-column: 1 / -1;
  }
`;

function MonthlyChart() {
  const { isDarkMode } = useDarkMode();
  const monthlyTasks = MonthlyData();

  console.log(isDarkMode);

  const colors = isDarkMode
    ? {
        tasks: { stroke: '#E8AC12', fill: '#E4CE96' },
        projects: { stroke: '#42A0E0', fill: '#9BC8E6' },
        text: '#e5e7eb',
        stroke: '#555',
        // background: '#18212f',
      }
    : {
        tasks: { stroke: '#FFBD14', fill: '#FFE298' },
        projects: { stroke: '#45B5FF', fill: '#A5DBFF' },
        text: '#374151',
        stroke: '#ddd',
        // background: '#fff',
      };

  return (
    <StyledMonthlyChart>
      <Heading as="h4">Monthly chart</Heading>
      <ResponsiveContainer width="95%" height={280}>
        <AreaChart data={monthlyTasks}>
          <CartesianGrid stroke={colors.stroke} strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <YAxis
            tick={{ fill: colors.text }}
            tickLine={{ stroke: colors.text }}
          />
          <Tooltip
            contentStyle={{
              fontFamily: 'var(--font-family)',
              border: 'var(--border-solid)',
              borderColor: 'var(--color-gray-200)',
              borderRadius: '6px',
              boxShadow: 'var(--shadow)',
              backgroundColor: 'var(--color-gray-0)',
            }}
          />
          <Area
            type="monotone"
            dataKey="tasks"
            stroke={colors.tasks.stroke}
            fill={colors.tasks.fill}
            stackId="1"
            strokeWidth={2}
          />
          <Area
            type="monotone"
            dataKey="projects"
            stackId="1"
            strokeWidth={2}
            stroke={colors.projects.stroke}
            fill={colors.projects.fill}
          />
        </AreaChart>
      </ResponsiveContainer>
    </StyledMonthlyChart>
  );
}

export default MonthlyChart;
