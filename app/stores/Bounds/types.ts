export type Bounds = {
  positions: kakao.maps.LatLng[]
}

type ApplyAction = {
  type: 'apply';
  payload: {
    positions: kakao.maps.LatLng[]
  }
};

type ClearAction = {
  type: 'clear';
};

export type BoundsAction =
  | ApplyAction
  | ClearAction
