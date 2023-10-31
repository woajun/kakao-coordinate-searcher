import { useState } from 'react';

export type Bound = {
  latlngs: kakao.maps.LatLng[] | null
  map: kakao.maps.Map | null
};

export type BoundState = {
  setLatLngs: (latlngs: kakao.maps.LatLng[]) => void;
  setMap: (map: kakao.maps.Map) => void;
  /** 지도에 latlngs를 적용한다. */
  apply: (latlngs?: kakao.maps.LatLng[] | null) => void;
};

export default function useBoundState(): BoundState {
  const [bound, setBound] = useState<Bound>(
    { latlngs: null, map: null },
  );
  return {
    setLatLngs: (latlngs) => {
      setBound({
        ...bound,
        latlngs,
      });
    },
    setMap: (map) => {
      setBound({
        ...bound,
        map,
      });
    },
    apply: (latlngs = bound.latlngs) => {
      if (bound.map && latlngs) {
        const bounds = new kakao.maps.LatLngBounds();
        latlngs.forEach((p) => bounds.extend(p));
        bound.map.setBounds(bounds);
        setBound({
          ...bound,
          latlngs: null,
        });
      }
    },
  };
}
