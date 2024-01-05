import styled from 'styled-components';

const Badge = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding: 8px 12px;
  font-size: var(--font-size-min);
  font-weight: var(--font-weight-extrabold);
  text-transform: uppercase;
  border-radius: 1000px;
  transition: color var(--transition), background-color var(--transition);
`;

export default Badge;
