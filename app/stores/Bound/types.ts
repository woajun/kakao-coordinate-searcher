export type Bound = {
  latlngs: kakao.maps.LatLng[]
};

type ApplyAction = {
  type: 'apply';
  payload: {
    latlngs: kakao.maps.LatLng[]
  }
};

type ClearAction = {
  type: 'clear';
};

export type BoundAction =
  | ApplyAction
  | ClearAction;

type BoundDispatcher = {
  apply: (latlngs: kakao.maps.LatLng[]) => void;
  clear: () => void;
};

export type BoundReducer = [Bound, BoundDispatcher];
