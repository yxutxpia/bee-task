import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';

const StyledFilter = styled.div`
  ${props =>
    props.type === 'linear' &&
    css`
      display: flex;
      align-items: center;
    `}
`;

const FilterLinearButton = styled.button`
  padding: 8px 12px;
  color: var(--color-slate-400);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border-bottom: 2px solid var(--color-pale-purple-300);
  transition: color var(--transition), border-color var(--transition);

  ${props =>
    props.active &&
    css`
      color: var(--color-font);
      border-color: var(--color-font);
    `}
`;

function Filter({ type = 'linear', filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentFilter = searchParams.get(filterField) || options.at(0).value;

  function handleClick(value) {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1);

    setSearchParams(searchParams);
  }

  if (type === 'linear')
    return (
      <StyledFilter>
        {options.map(option => (
          <FilterLinearButton
            key={option.value}
            onClick={() => handleClick(option.value)}
            active={option.value === currentFilter}
            disabled={option.value === currentFilter}
          >
            {option.label}
          </FilterLinearButton>
        ))}
      </StyledFilter>
    );

  if (type === 'button') return <StyledFilter>Filter</StyledFilter>;
}

export default Filter;
