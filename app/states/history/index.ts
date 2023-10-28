import { useState } from 'react';
import { SelectedItem } from '@/app/stores/SelectedItem/types';
import { History, HistoryActions } from './types';

export default function useHistoryActions(): HistoryActions {
  const [history, setHistory] = useState<History>([]);

  function get() {
    return history;
  }

  function add(selectedItem: SelectedItem) {
    setHistory([...history, { ...selectedItem, at: new Date(), key: `${Math.random()}` }]);
  }

  function clear() {
    setHistory([]);
  }

  function remove(key: string) {
    const filtered = history.filter((item) => item.key !== key);
    setHistory(filtered);
  }

  return {
    get,
    add,
    clear,
    remove,
  };
}
