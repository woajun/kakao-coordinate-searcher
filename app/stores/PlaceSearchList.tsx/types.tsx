export type PlaceSearchList = {
  data: kakao.maps.services.PlacesSearchResult;
  pagination: kakao.maps.Pagination;
};

type SetListAction = {
  type: 'set';
  payload: PlaceSearchList;
};

type NextPageAction = {
  type: 'next';
};

type PrevPageAction = {
  type: 'prev';
};

type FirstPageAction = {
  type: 'first';
};

type LastPageAction = {
  type: 'last';
};

export type PlaceSearchListAction =
  | SetListAction
  | NextPageAction
  | PrevPageAction
  | FirstPageAction
  | LastPageAction;
