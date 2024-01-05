import styled from 'styled-components';

const StyledMiniCard = styled.div`
  display: grid;
  grid-template-columns: 56px 1fr;
  grid-template-rows: auto auto;
  gap: 4px 12px;
  padding: 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }
`;

const Icon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  background-color: ${props =>
    props.color && `var(--color-card-${props.color}-100)`};
  transition: background-color var(--transition);

  & > svg {
    width: 24px;
    height: 24px;

    color: ${props => props.color && `var(--color-card-${props.color}-600)`};
  }
`;

const Heading = styled.h5`
  align-self: end;
  color: var(--color-gray-500);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

const Count = styled.p`
  font-size: var(--font-size-big);
  font-weight: var(--font-weight-extrabold);
  transition: color var(--transition);
`;

function MiniCard({ color, heading, icon, count, children }) {
  return (
    <StyledMiniCard>
      {icon && <Icon color={color}>{icon}</Icon>}
      {heading && <Heading>{heading}</Heading>}
      {count && <Count>{count}</Count>}
      {children}
    </StyledMiniCard>
  );
}

export default MiniCard;
