import styled from 'styled-components';
import { useSearchToggle } from '../context/SearchToggleContext';
import { HiOutlineMagnifyingGlass } from 'react-icons/hi2';
import { useState } from 'react';
import SearchResultItem from './SearchResultItem';
import { useProfiles } from '../hooks/useProfiles';

const StyledSearchResponsive = styled.div``;

const Overlay = styled.div`
  width: 100dvw;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  background-color: var(--color-modal-bg);
  z-index: 10000;
`;

const SearchForm = styled.form`
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  padding: 4px 24px;
  background-color: var(--color-gray-0);

  & > div {
    display: flex;
    align-items: center;
    gap: 8px;

    & svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const SearchInput = styled.input`
  width: 100%;
  height: 36px;
`;

const SearchResultWrapper = styled.div`
  width: 100%;
  max-height: calc(100dvh - 44px);
  padding: 12px;
  position: fixed;
  top: 44px;
  left: 0;
  border-top: var(--border-solid);
  background-color: var(--color-gray-0);
  overflow-y: scroll;
`;

const SearchResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

function SearchResponsive() {
  const { active, dispatch } = useSearchToggle();
  const { profiles, isLoading } = useProfiles();
  const [query, setQuery] = useState('');

  return (
    <Overlay
      onClick={() => dispatch({ type: 'search/toggle', payload: !active })}
    >
      <StyledSearchResponsive onClick={e => e.stopPropagation()}>
        <SearchForm>
          <div>
            <HiOutlineMagnifyingGlass />
            <SearchInput
              value={query}
              placeholder="Search users"
              onChange={e => setQuery(e.target.value)}
            />
            {query.length > 0 && (
              <SearchResultWrapper>
                <SearchResultList>
                  {profiles.map(profile => (
                    <SearchResultItem
                      key={profile.id}
                      query={query}
                      onQuery={setQuery}
                      profile={profile}
                      type="responsive"
                    />
                  ))}
                </SearchResultList>
              </SearchResultWrapper>
            )}
          </div>
        </SearchForm>
      </StyledSearchResponsive>
    </Overlay>
  );
}

export default SearchResponsive;
