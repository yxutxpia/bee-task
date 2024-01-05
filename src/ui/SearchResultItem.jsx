import styled from 'styled-components';
import { useProfiles } from '../hooks/useProfiles';
import { Link } from 'react-router-dom';

const StyledSearchResultItem = styled.li`
  & > a:link,
  & > a:visited {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: var(--round-sm);
    transition: color var(--transition), background-color var(--transition);

    & > div {
      display: flex;
      flex-direction: column;
      gap: 2px;

      & > p {
        font-size: var(--font-size-sm);
        letter-spacing: 0.45px;
      }
    }
  }

  & > a:hover,
  & > a:active {
    background-color: var(--color-pale-purple-100);
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
`;

function SearchResultItem({ query, onQuery, profile }) {
  const { username, user_id, avatar } = profile;

  return (
    <>
      {(username.includes(query) || user_id.includes(query)) && (
        <StyledSearchResultItem onClick={() => onQuery('')}>
          <Link to={`/profile/${user_id}`}>
            <Avatar src={avatar ? avatar : '/default-avatar.svg'} />
            <div>
              <h4>{username}</h4>
              <p>@{user_id}</p>
            </div>
          </Link>
        </StyledSearchResultItem>
      )}
    </>
  );
}

export default SearchResultItem;
