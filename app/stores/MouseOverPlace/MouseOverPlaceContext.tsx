import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { MouseOverPlaceAction } from './types';

const MouseOverPlaceContext = createContext<
kakao.maps.services.PlacesSearchResultItem | null>(null);

const MouseOverPlaceDispatchContext = createContext<Dispatch<MouseOverPlaceAction> | null>(null);

type Props = {
  children: ReactNode;
};

function MouseOverPlaceReducer(
  _: kakao.maps.services.PlacesSearchResultItem | null,
  action: MouseOverPlaceAction,
): kakao.maps.services.PlacesSearchResultItem | null {
  switch (action.type) {
    case 'set': {
      return action.payload.place;
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
