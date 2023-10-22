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

type PlaceSearchListDispatcher = {
  set: (data: kakao.maps.services.PlacesSearchResult, pagination: kakao.maps.Pagination) => void
  clear: () => void
};
export type PlaceSearchListReducer = [ PlaceSearchList | null, PlaceSearchListDispatcher];
