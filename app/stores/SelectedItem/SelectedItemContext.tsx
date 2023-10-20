import {
  Dispatch, ReactNode, createContext, useContext, useReducer,
} from 'react';
import { SelectedItem, SelectedItemAction } from './types';

const SelectedItemContext = createContext<SelectedItem | null>(null);

const SelectedItemDispatchContext = createContext<Dispatch<SelectedItemAction> | null>(null);

function SelectedItemReducer(_: SelectedItem | null, action: SelectedItemAction) {
  switch (action.type) {
    case 'set':
      return action.payload;
    case 'clear':
      return null;
    default:
      throw Error('Unknown action');
  }
}

export function SelectedItemProvider({ children }: { children: ReactNode }) {
  const [selectedItem, dispatch] = useReducer(SelectedItemReducer, null);

  return (
    <SelectedItemContext.Provider value={selectedItem}>
      <SelectedItemDispatchContext.Provider value={dispatch}>
        {children}
      </SelectedItemDispatchContext.Provider>
    </SelectedItemContext.Provider>
  );
}

export const useSelectedItem = () => useContext(SelectedItemContext);

export const useSelectedItemDispatch = () => useContext(SelectedItemDispatchContext);
