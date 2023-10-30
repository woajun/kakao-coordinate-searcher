import { useState } from 'react';

export type Bound = {
  bounds: kakao.maps.LatLngBounds | null
  isTrigger: boolean
};

export type BoundState = {
  get: () => Bound;
  ready: (latlngs: kakao.maps.LatLng[]) => void;
  trigger: () => void;
  apply: (map: kakao.maps.Map | null) => void;
};

export default function useBoundState(): BoundState {
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
    apply: (map) => {
      if (map && bound.bounds && bound.isTrigger) {
        map.setBounds(bound.bounds);
        setBound({
          bounds: null,
          isTrigger: false,
        });
      }
    },
  };
}
