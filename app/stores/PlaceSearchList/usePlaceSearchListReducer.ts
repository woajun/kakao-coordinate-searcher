import { useReducer } from 'react';
import { PlaceSearchList, PlaceSearchListAction, PlaceSearchListReducer } from './types';

function placeSearchListReducer(
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

export default function usePlaceSearchListReducer(): PlaceSearchListReducer {
  const [placeSearchList, dispatch] = useReducer(placeSearchListReducer, null);
  const placeSearchListDispatcher = {
    set: (data: kakao.maps.services.PlacesSearchResult, pagination: kakao.maps.Pagination) => {
      dispatch({ type: 'set', payload: { data, pagination } });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
  };
  return [placeSearchList, placeSearchListDispatcher];
}
