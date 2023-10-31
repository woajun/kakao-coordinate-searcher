import { useState } from 'react';

export type PlaceSearchList = {
  data: kakao.maps.services.PlacesSearchResult;
  pagination: kakao.maps.Pagination;
};

export type PlaceSearchListState = {
  get: () => PlaceSearchList | null
  set: (data: kakao.maps.services.PlacesSearchResult, pagination: kakao.maps.Pagination)
  => void
  clear: () => void
};

export default function usePlaceSearchListState(): PlaceSearchListState {
  const [placeSearchList, setPlaceSearchList] = useState<PlaceSearchList | null>(null);
  return {
    get: () => placeSearchList,
    set: (data, pagination) => {
      setPlaceSearchList({ data, pagination });
    },
    clear: () => {
      setPlaceSearchList(null);
    },
  };
}
