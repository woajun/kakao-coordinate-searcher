import { useReducer } from 'react';
import { Bound, BoundAction, BoundReducer } from './types';

function boundReducer(_: Bound, action: BoundAction): Bound {
  switch (action.type) {
    case 'ready': {
      const bounds = new kakao.maps.LatLngBounds();
      action.latlngs.forEach((p) => bounds.extend(p));
      return {
        bounds,
        isTrigger: false,
      };
    }
    case 'trigger': {
      return {
        bounds: _.bounds,
        isTrigger: true,
      };
    }
    case 'clear': {
      return {
        bounds: null,
        isTrigger: false,
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export default function useBoundReducer(): BoundReducer {
  const [bound, dispatch] = useReducer(
    boundReducer,
    { bounds: null, isTrigger: false },
  );
  return [bound, {
    ready: (latlngs) => {
      dispatch({ type: 'ready', latlngs });
    },
    trigger: () => {
      dispatch({ type: 'trigger' });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
  }];
}
