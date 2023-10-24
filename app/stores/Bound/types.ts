export type Bound = {
  bounds: kakao.maps.LatLngBounds | null
  isTrigger: boolean
};

type BoundDispatcher = {
  ready: (latlngs: kakao.maps.LatLng[]) => void;
  trigger: () => void;
  clear: () => void;
};

export type BoundReducer = [Bound, BoundDispatcher];
