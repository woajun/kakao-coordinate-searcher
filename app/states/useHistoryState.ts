import { useState } from 'react';
import { SelectedItem } from '@/app/stores/SelectedItem/types';

export interface HistoryItem extends SelectedItem {
  at: Date
  key: string
}

export type History = HistoryItem[];

export type HistoryState = {
  get: () => History;
  add: (selectedItem: SelectedItem) => void;
  clear: () => void;
  remove: (key: string) => void;
};

export default function useHistoryState(): HistoryState {
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
