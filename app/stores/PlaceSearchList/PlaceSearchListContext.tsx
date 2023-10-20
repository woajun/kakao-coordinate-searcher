import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { PlaceSearchList, PlaceSearchListAction } from './types';

const PlaceSearchListContext = createContext<PlaceSearchList | null>(null);

const PlaceSearchListDispatchContext = createContext<Dispatch<PlaceSearchListAction> | null>(null);

type Props = {
  children: ReactNode;
};

function PlaceSearchListReducer(
  _: PlaceSearchList | null,
  action: PlaceSearchListAction,
): PlaceSearchList | null {
  switch (action.type) {
    case 'set': {
      return {
        data: action.payload.data,
        pagination: action.payload.pagination,
      };
    }
    case 'clear': {
      return null;
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export function PlaceSearchListProvider({ children }: Props) {
  const [placeSearchList, dispatch] = useReducer(PlaceSearchListReducer, null);

  return (
    <PlaceSearchListContext.Provider value={placeSearchList}>
      <PlaceSearchListDispatchContext.Provider value={dispatch}>
        {children}
      </PlaceSearchListDispatchContext.Provider>
    </PlaceSearchListContext.Provider>
  );
}

export const usePlaceSearchList = () => useContext(PlaceSearchListContext);

export const usePlaceSearchListDispatch = () => useContext(PlaceSearchListDispatchContext);
