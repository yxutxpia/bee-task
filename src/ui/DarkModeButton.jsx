import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';
import { HiOutlineMoon, HiOutlineSun } from 'react-icons/hi2';

const StyledDarkModeButton = styled.button`
  width: 34px;
  height: 34px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  transition: background-color vaR(--transition);

  &:hover svg {
    color: var(--color-primary-500);
  }
`;

function DarkModeButton() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <StyledDarkModeButton onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </StyledDarkModeButton>
  );
}

export default DarkModeButton;

/*
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import ButtonIcon from "./ButtonIcon";
import { useDarkMode } from "../context/DarkModeContext";

function DarkModeToggle() {
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default DarkModeToggle;
*/
