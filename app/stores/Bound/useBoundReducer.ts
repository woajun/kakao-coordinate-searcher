import { useReducer } from 'react';
import { Bound, BoundAction, BoundReducer } from './types';

function boundReducer(_: Bound, action: BoundAction): Bound {
  switch (action.type) {
    case 'apply': {
      return {
        latlngs: action.payload.latlngs,
      };
    }
    case 'clear': {
      return {
        latlngs: [],
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export default function useBoundReducer(init: kakao.maps.LatLng[]): BoundReducer {
  const [bound, dispatch] = useReducer(boundReducer, { latlngs: init });
  return [bound, {
    apply: (latlngs) => {
      dispatch({ type: 'apply', payload: { latlngs } });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
  }];
}
