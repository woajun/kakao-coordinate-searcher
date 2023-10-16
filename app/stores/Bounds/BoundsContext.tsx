import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useReducer, useState } from "react";
import { Bounds, BoundsAction } from "./types";

const BoundsContext = createContext<Bounds>({
  positions: [],
});

const BoundsDispatchContext = createContext<Dispatch<BoundsAction>| null>(null);

function BoundsReducer(_: Bounds, action: BoundsAction): Bounds {
    switch (action.type) {
      case 'apply': {
        return {
          positions: action.payload.positions
        };
      }
      case 'clear': {
        return {
          positions: []
        };
      }
      default: {
        throw Error('Unknown action');
      }
    }
}

export const BoundsProvider = ({ children }: {children: ReactNode}) => {
  const [bounds, dispatch] = useReducer(BoundsReducer, {
    positions: []
  });
  return (
    <BoundsContext.Provider value={bounds}>
      <BoundsDispatchContext.Provider value={dispatch}>
        {children}
      </BoundsDispatchContext.Provider>
    </BoundsContext.Provider>
  );
}

export const useBounds = () => {
  return useContext(BoundsContext);
}

export const useBoundsDispatch = () => {
  return useContext(BoundsDispatchContext);
}