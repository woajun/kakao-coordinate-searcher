export type SelectedItem = {
  title: string
  position: kakao.maps.LatLng
  panto?: boolean
};

type SetAction = {
  type: 'set'
  payload: SelectedItem
};

type ClearAction = {
  type: 'clear';
};

export type SelectedItemAction = SetAction | ClearAction;
