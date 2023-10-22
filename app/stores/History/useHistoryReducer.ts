import { useReducer } from 'react';
import { SelectedItem } from '../SelectedItem/types';
import type { History, HistoryAction, HistoryReducer } from './types';

function historyReducer(history: History, action: HistoryAction) {
  switch (action.type) {
    case 'add':
      return [
        ...history,
        { ...action.payload.selectedItem, at: new Date(), key: `${Math.random()}` },
      ];
    case 'clear':
      return [];
    case 'remove':
      return history.filter((item) => item.key !== action.payload.key);
    default:
      throw Error('Unknown action');
  }
}

export default function useHistoryReducer(init: History): HistoryReducer {
  const [history, dispatch] = useReducer(historyReducer, init);
  const historyDispatcher = {
    add: (selectedItem: SelectedItem) => {
      dispatch({ type: 'add', payload: { selectedItem } });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
    remove: (key: string) => {
      dispatch({ type: 'remove', payload: { key } });
    },
  };
  return [history, historyDispatcher];
}
