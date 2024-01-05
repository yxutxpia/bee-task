import { useContext } from 'react';
import { useReducer } from 'react';
import { createContext } from 'react';

const SidebarToggleContext = createContext();

const initialState = {
  active: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'sidebar/toggle':
      return { ...state, active: action.payload };

    default:
      throw new Error('Unknown action type');
  }
}

function SidebarToggleProvider({ children }) {
  const [{ active }, dispatch] = useReducer(reducer, initialState);

  return (
    <SidebarToggleContext.Provider value={{ active, dispatch }}>
      {children}
    </SidebarToggleContext.Provider>
  );
}

function useSidebarToggle() {
  const context = useContext(SidebarToggleContext);

  if (context === undefined)
    throw new Error(
      'SidebarToggleContext was used outside of SidebarToggleProvider'
    );

  return context;
}

export { SidebarToggleProvider, useSidebarToggle };
