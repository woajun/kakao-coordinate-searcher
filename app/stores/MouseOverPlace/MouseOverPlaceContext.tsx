import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { MouseOverPlaceAction } from './types';
import { SelectedItem } from '../SelectedItem/types';

const MouseOverPlaceContext = createContext<
SelectedItem | null>(null);

const MouseOverPlaceDispatchContext = createContext<Dispatch<MouseOverPlaceAction> | null>(null);

type Props = {
  children: ReactNode;
};

function MouseOverPlaceReducer(
  _: SelectedItem | null,
  action: MouseOverPlaceAction,
): SelectedItem | null {
  switch (action.type) {
    case 'set': {
      return action.payload;
    }
    case 'clear': {
      return null;
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export function MouseOverPlaceProvider({ children }: Props) {
  const [place, dispatch] = useReducer(MouseOverPlaceReducer, null);

  return (
    <MouseOverPlaceContext.Provider value={place}>
      <MouseOverPlaceDispatchContext.Provider value={dispatch}>
        {children}
      </MouseOverPlaceDispatchContext.Provider>
    </MouseOverPlaceContext.Provider>
  );
}

export const useMouseOverPlace = () => useContext(MouseOverPlaceContext);

export const useMouseOverPlaceDispatch = () => useContext(MouseOverPlaceDispatchContext);
