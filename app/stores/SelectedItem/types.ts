export type SelectedItem = {
  title: string
  position: kakao.maps.LatLng
  panto?: boolean
  noRecord?: boolean
};

type SetAction = {
  type: 'set'
  payload: SelectedItem
};

type ClearAction = {
  type: 'clear';
};

export type SelectedItemAction = SetAction | ClearAction;

type SelectedItemDispatcher = {
  set: (item: SelectedItem) => void
  clear: () => void
};

export type SelectedItemReducer = [SelectedItem | null, SelectedItemDispatcher];
