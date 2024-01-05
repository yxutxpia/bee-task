import { useState } from 'react';
import styled from 'styled-components';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useProfiles } from '../hooks/useProfiles';
import SearchResultItem from './SearchResultItem';
import { useRef } from 'react';
import { useKey } from '../hooks/useKey';

const StyledSearch = styled.div`
  position: relative;

  @media only screen and (max-width: 660px) {
    display: none;
  }
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px;
  border-radius: 1000px;
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:focus-within {
    background-color: var(--color-gray-0);
  }

  & svg {
    width: 18px;
    height: 18px;
  }
`;

const SearchResultWrapper = styled.div`
  min-width: 100%;
  padding: 6px;
  position: absolute;
  top: calc(100% + 12px);
  left: 0;
  border-radius: var(--round-sm);
  box-shadow: var(--shadow);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
  z-index: 10;
`;

const SearchResultList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function Search() {
  const inputEl = useRef(null);

  const [query, setQuery] = useState('');
  const { profiles, isLoading } = useProfiles();

  useKey('Escape', function () {
    if (document.activeElement !== inputEl.current) return;
    inputEl.current.blur();
    setQuery('');
  });

  if (isLoading) return null;

  return (
    <StyledSearch>
      <SearchForm onSubmit={e => e.preventDefault()}>
        <HiMagnifyingGlass />
        <input
          type="text"
          placeholder="search users"
          value={query}
          ref={inputEl}
          onChange={e => setQuery(e.target.value)}
        />
      </SearchForm>
      {query.length > 0 && (
        <SearchResultWrapper>
          <SearchResultList>
            {profiles.map(profile => (
              <SearchResultItem
                key={profile.id}
                query={query}
                onQuery={setQuery}
                profile={profile}
              />
            ))}
          </SearchResultList>
        </SearchResultWrapper>
      )}
    </StyledSearch>
  );
}

export default Search;
