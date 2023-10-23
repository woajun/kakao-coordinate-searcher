import { useReducer } from 'react';
import { MouseOverPlace, MouseOverPlaceAction, MouseOverPlaceReducer } from './types';

function mouseOverPlaceReducer(
  _: MouseOverPlace | null,
  action: MouseOverPlaceAction,
): MouseOverPlace | null {
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

export default function useMouseOverPlaceReducer(): MouseOverPlaceReducer {
  const [mouseOverPlace, dispatch] = useReducer(mouseOverPlaceReducer, null);
  const mouseOverPlaceDispatcher = {
    set: (item: MouseOverPlace) => {
      dispatch({ type: 'set', payload: item });
    },
    clear: () => {
      dispatch({ type: 'clear' });
    },
  };
  return [mouseOverPlace, mouseOverPlaceDispatcher];
}
