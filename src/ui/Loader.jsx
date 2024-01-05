import styled from 'styled-components';

const StyledLoader = styled.div`
  width: 100dvw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: fixed;
  top: 0;
  left: 0;
  line-height: 50px;
  text-align: center;
  transition: all 0.75s;
  z-index: 10000;
`;

const Svg = styled.svg`
  width: 72px;
  height: 72px;
  transform-origin: center;
  animation: rotate 2s linear infinite;

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

const Circle = styled.circle`
  fill: none;
  stroke: var(--color-primary-500);
  stroke-width: 4;
  stroke-dasharray: 1, 200;
  stroke-dashoffset: 0;
  stroke-linecap: round;
  animation: dash 1.5s ease-in-out infinite;

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 200;
      stroke-dashoffset: -35px;
    }

    100% {
      stroke-dashoffset: -125px;
    }
  }
`;

function Loader() {
  return (
    <StyledLoader>
      <Svg viewBox="25 25 50 50">
        <Circle r="20" cy="50" cx="50"></Circle>
      </Svg>
    </StyledLoader>
  );
}

export default Loader;
