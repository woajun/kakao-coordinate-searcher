import {
  Dispatch, ReactNode, createContext, useContext, useReducer,
} from 'react';
import { History, HistoryAction } from './types';

const HistoryContext = createContext<History>([]);

const HistoryDispatchContext = createContext<Dispatch<HistoryAction> | null>(null);

function Reducer(history: History, action: HistoryAction) {
  switch (action.type) {
    case 'add':
      return [
        ...history,
        { ...action.payload, at: new Date(), key: `${Math.random()}` },
      ];
    case 'replace':
      return action.payload;
    case 'clear':
      return [];
    default:
      throw Error('Unknown action');
  }
}

export function HistoryProvider({ children }: { children: ReactNode }) {
  const [history, dispatch] = useReducer(Reducer, []);
  return (
    <HistoryContext.Provider value={history}>
      <HistoryDispatchContext.Provider value={dispatch}>
        {children}
      </HistoryDispatchContext.Provider>
    </HistoryContext.Provider>
  );
}

export const useHistory = () => useContext(HistoryContext);

export const useHistoryDispatch = () => useContext(HistoryDispatchContext);
