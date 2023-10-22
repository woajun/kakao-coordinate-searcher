export type Bound = {
  bounds: kakao.maps.LatLngBounds | null
  isTrigger: boolean
};

type ReadyAction = {
  type: 'ready';
  latlngs: kakao.maps.LatLng[];
};

type TriggerAction = {
  type: 'trigger';
};

type ClearAction = {
  type: 'clear';
};

export type BoundAction =
  | ReadyAction
  | TriggerAction
  | ClearAction;

type BoundDispatcher = {
  ready: (latlngs: kakao.maps.LatLng[]) => void;
  trigger: () => void;
  clear: () => void;
};

export type BoundReducer = [Bound, BoundDispatcher];
