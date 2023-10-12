import {
  Dispatch,
  ReactNode,
  createContext,
  useContext,
  useReducer,
} from 'react';
import { KakaoMap, KakaoMapAction } from './types';

const KakaoMapContext = createContext<KakaoMap | null>(null);

const KakaoMapDispatchContext = createContext<Dispatch<KakaoMapAction> | null>(
  null
);

type Props = {
  children: ReactNode;
};

function KakaoMapReducer(_: KakaoMap | null, action: KakaoMapAction): KakaoMap | null {
  switch (action.type) {
    case 'set': {
      return {
        map: action.payload.map,
        places: action.payload.places,
      };
    }
    default: {
      throw Error('Unknown action');
    }
  }
}

export const KakaoMapProvider = ({ children }: Props) => {
  const [kakaoMap, dispatch] = useReducer(KakaoMapReducer, null);

  return (
    <KakaoMapContext.Provider value={kakaoMap}>
      <KakaoMapDispatchContext.Provider value={dispatch}>
        {children}
      </KakaoMapDispatchContext.Provider>
    </KakaoMapContext.Provider>
  );
};

export const useKakaoMap = () => {
  return useContext(KakaoMapContext);
};

export const useKakaoMapDispatcher = () => {
  return useContext(KakaoMapDispatchContext);
};
