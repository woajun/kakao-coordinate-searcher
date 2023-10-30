import { useState } from 'react';
import { Bound, BoundReducer } from './types';

export default function useBoundReducer(): BoundReducer {
  const [bound, setBound] = useState<Bound>(
    { bounds: null, isTrigger: false },
  );
  return {
    get: () => bound,
    ready: (latlngs) => {
      const bounds = new kakao.maps.LatLngBounds();
      latlngs.forEach((p) => bounds.extend(p));
      setBound({
        bounds,
        isTrigger: false,
      });
    },
    trigger: () => {
      setBound((_) => ({
        bounds: _.bounds,
        isTrigger: true,
      }));
    },
    clear: () => {
      setBound({
        bounds: null,
        isTrigger: false,
      });
    },
  };
}
