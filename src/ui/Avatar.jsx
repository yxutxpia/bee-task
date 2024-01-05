import styled from 'styled-components';
import { DEFAULT_AVATAR } from '../utils/constants';

const StyledAvatar = styled.img`
  width: ${props => props.size && `${props.size}px`};
  height: ${props => props.size && `${props.size}px`};
  display: block;
  object-fit: cover;
  border-radius: ${props =>
    props.shape === 'circle' ? '50%' : 'var(--round-sm)'};
  overflow: hidden;
`;

function Avatar({ size, avatar, shape = 'circle' }) {
  return (
    <StyledAvatar
      src={avatar ? avatar : DEFAULT_AVATAR}
      size={size}
      shape={shape}
    />
  );
}

export default Avatar;
