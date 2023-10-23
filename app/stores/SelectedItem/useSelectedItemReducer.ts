import { useReducer } from 'react';
import { SelectedItem, SelectedItemAction, SelectedItemReducer } from './types';

function selectedItemReducer(_: SelectedItem | null, action: SelectedItemAction) {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'clear':
      return null;
    default:
      throw Error('Unknown action');
  }
}

export default function useSelectedItemReducer(): SelectedItemReducer {
  const [selectedItem, dispatch] = useReducer(selectedItemReducer, null);
  const selectedItemDispatcher = {
    set: (item: SelectedItem) => {
      dispatch({ type: 'set', payload: item });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
  };
  return [selectedItem, selectedItemDispatcher];
}
