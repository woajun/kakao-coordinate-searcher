import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from "react";
import { History, HistoryAction } from "./types";

const HistoryContext = createContext<History>([]);

const HistoryDispatchContext = createContext<Dispatch<HistoryAction> | null>(null);

function Reducer(history: History, action: HistoryAction) {
  switch (action.type) {
    case 'add':
      history.push(action.payload)
      return history;
    case 'replace':
      return action.payload;
    case 'clear':
      return [];
    default:
      throw Error('Unknown action');
  }
}

export const HistoryProvider = ({ children }: {children: ReactNode}) => {
  const [history, dispatch] = useReducer(Reducer, []);
  return (
    <HistoryContext.Provider value={history}>
      <HistoryDispatchContext.Provider value={dispatch}>
        {children}
      </HistoryDispatchContext.Provider>
    </HistoryContext.Provider>
  )
}

export const useHistory = () => {
  return useContext(HistoryContext);
}

export const useHistoryDispatch = () => {
  return useContext(HistoryDispatchContext);
}