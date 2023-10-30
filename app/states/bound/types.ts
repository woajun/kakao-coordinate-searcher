export type Bound = {
  bounds: kakao.maps.LatLngBounds | null
  isTrigger: boolean
};

export type BoundReducer = {
  get: () => Bound;
  ready: (latlngs: kakao.maps.LatLng[]) => void;
  trigger: () => void;
  clear: () => void;
};
