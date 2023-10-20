export type PlaceSearchList = {
  data: kakao.maps.services.PlacesSearchResult;
  pagination: kakao.maps.Pagination;
};

type SetListAction = {
  type: 'set';
  payload: PlaceSearchList;
};

type ClearAction = {
  type: 'clear';
};

export type PlaceSearchListAction =
  | SetListAction
  | ClearAction;
