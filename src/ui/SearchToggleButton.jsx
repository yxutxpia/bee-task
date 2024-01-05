import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import styled from 'styled-components';
import { useSearchToggle } from '../context/SearchToggleContext';

const StyledSearchToggleButton = styled.button`
  width: 34px;
  height: 34px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  transition: background-color vaR(--transition);

  &:hover svg {
    color: var(--color-primary-500);
  }

  @media only screen and (max-width: 660px) {
    display: flex;
  }
`;

function SearchToggleButton() {
  const { active, dispatch } = useSearchToggle();

  return (
    <StyledSearchToggleButton
      onClick={() => dispatch({ type: 'search/toggle', payload: !active })}
    >
      <HiOutlineMagnifyingGlass />
    </StyledSearchToggleButton>
  );
}

export default SearchToggleButton;
