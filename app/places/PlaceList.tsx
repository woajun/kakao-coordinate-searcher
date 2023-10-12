import { useEffect, useState } from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import {
  usePlaceSearchList,
  usePlaceSearchListDispatch,
} from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';
import { useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';

export default function PlaceList() {
  const isLoaded = useIsLoadedMap();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [keyword, setKeyword] = useState('');
  const pListDispatch = usePlaceSearchListDispatch();
  const pList = usePlaceSearchList();
  const moPlaceDispatch = useMouseOverPlaceDispatch();

  useEffect(() => {
    if (!isLoaded) return;
    setPs(new kakao.maps.services.Places());
  }, [isLoaded]);

  useEffect(() => {
    if (!ps || !pListDispatch) return;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        pListDispatch({
          type: 'set',
          payload: {
            data,
            pagination,
          },
        });
      }
    });
  }, [keyword, ps, pListDispatch]);
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setKeyword(e.target.value);
        }}
      />
      {pList &&
        pList.data.map((e) => {
          return (
            <div
              key={e.id}
              onMouseOver={() => {
                if (!moPlaceDispatch) return;
                moPlaceDispatch({ type: 'set', payload: { place: e } });
              }}
              onMouseLeave={() => {
                if (!moPlaceDispatch) return;
                moPlaceDispatch({ type: 'clear' });
              }}
            >
              {e.place_name}
            </div>
          );
        })}
    </div>
  );
}
