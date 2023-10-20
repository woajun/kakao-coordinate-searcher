type SetAction = {
  type: 'set';
  payload: {
    place: kakao.maps.services.PlacesSearchResultItem
  };
};

type ClearAction = {
  type: 'clear';
};

export type MouseOverPlaceAction =
  | SetAction
  | ClearAction;
