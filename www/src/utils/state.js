import React, { createContext, useContext, useReducer } from 'react';
import { lightTheme, darkTheme } from './theme';

export const StateContext = createContext(lightTheme);

const getInitialState = () => {
  if (typeof window !== `undefined`) {
    const theme = JSON.parse(window.localStorage.getItem('theme'));
    if (theme === null) {
      if (
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      ) {
        // dark mode
        return {
          theme: darkTheme,
        };
      } else {
        return {
          theme: lightTheme,
        };
      }
    }
    return {
      theme,
    };
  }

  return {
    theme: lightTheme,
  };
};

export const initialState = getInitialState();

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);

export const reducer = (state, action) => {
  switch (action.type) {
    case 'changeTheme':
      if (typeof window !== `undefined`) {
        window.localStorage.setItem('theme', JSON.stringify(action.newTheme));
      }
      return {
        ...state,
        theme: action.newTheme,
      };
    default:
      return state;
  }
};
