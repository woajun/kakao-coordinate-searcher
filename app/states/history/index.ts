import { useState } from 'react';
import { History, HistoryActions } from './types';

export default function useHistoryActions(): HistoryActions {
  const [history, setHistory] = useState<History>([]);
  return {
    get: () => history,

    add: (selectedItem) => {
      setHistory([...history, { ...selectedItem, at: new Date(), key: `${Math.random()}` }]);
    },

    clear: () => { setHistory([]); },

    remove: (key) => {
      const filtered = history.filter((item) => item.key !== key);
      setHistory(filtered);
    },
  };
}
