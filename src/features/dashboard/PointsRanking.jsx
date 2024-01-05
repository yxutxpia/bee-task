import { Link } from 'react-router-dom';

import styled from 'styled-components';

import { useProfiles } from '../../hooks/useProfiles';
import { HiCheckBadge } from 'react-icons/hi2';

import Heading from '../../ui/Heading';
import { DEFAULT_AVATAR } from '../../utils/constants';

const StyledPointsRanking = styled.div`
  /* grid-column: 1 / 5; */
  grid-column: 9 / 13;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);
  overflow-y: scroll;

  &:hover {
    background-color: var(--color-gray-0);
  }

  @media only screen and (max-width: 1290px) {
    display: none;
  }
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
  display: block;
  object-fit: cover;
  border-radius: 50%;
`;

const RankingList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const RankingItem = styled.li`
  & > a:link,
  & > a:visited {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 14px;
    border-radius: var(--round-sm);
    transition: color var(--transition), background-color var(--transition);
  }

  & > a:hover,
  & > a:active {
    background-color: var(--color-pale-purple-50);
  }

  & a > div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

const Username = styled.p`
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: var(--font-weight-bold);

  & > svg {
    color: var(--color-primary-500);
  }
`;

const Points = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
`;

function PointsRanking() {
  const { profiles, isLoading } = useProfiles();

  if (isLoading) return null;

  const sortedProfiles = profiles
    .filter(profile => profile.points > 1)
    .sort((a, b) => a.points - b.points)
    .reverse()
    .slice(0, 5);

  return (
    <StyledPointsRanking>
      <Heading as="h4">Ranking</Heading>
      <RankingList>
        {sortedProfiles.map(profile => (
          <RankingItem key={profile.id}>
            <Link to={`/profile/${profile.user_id}`}>
              <Avatar src={profile.avatar ? profile.avatar : DEFAULT_AVATAR} />
              <div>
                <Username>
                  <span>{profile.username}</span>
                  {profile.verified && <HiCheckBadge />}
                </Username>
                <Points>{profile.points} points</Points>
              </div>
            </Link>
          </RankingItem>
        ))}
      </RankingList>
    </StyledPointsRanking>
  );
}

export default PointsRanking;
