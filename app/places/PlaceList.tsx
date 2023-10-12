import { useEffect, useState } from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import {
  usePlaceSearchList,
  usePlaceSearchListDispatch,
} from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';
import { useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';
import Pagination from './Pagination';

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

  console.log(pList);
  return (
    <div className="py-3 px-2 flex flex-col justify-between h-full">
      <div>
        <input
          type="text"
          className="w-full border rounded-md px-2 py-2"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="flex flex-col gap-1 p-2">
          <div className="text-end">
            검색결과: {pList?.pagination.totalCount ?? 0} 건
          </div>
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
      </div>
      <div className="flex justify-center pb-5">
        <Pagination p={pList?.pagination} />
      </div>
    </div>
  );
}
