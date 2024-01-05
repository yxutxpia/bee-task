import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

const SearchToggleContext = createContext();

const initialState = {
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'search/toggle':
      return { ...state, active: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function SearchToggleProvider({ children }) {
  const [{ active }, dispatch] = useReducer(reducer, initialState);

  return (
    <SearchToggleContext.Provider value={{ active, dispatch }}>
      {children}
    </SearchToggleContext.Provider>
  );
}

function useSearchToggle() {
  const context = useContext(SearchToggleContext);

  if (context === undefined)
    throw new Error(
      'SearchToggleContext was used outside of SearchToggleProvider'
    );

  return context;
}

export { SearchToggleProvider, useSearchToggle };
