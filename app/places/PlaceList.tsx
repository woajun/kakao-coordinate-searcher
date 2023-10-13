import { useEffect, useState } from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import {
  usePlaceSearchList,
  usePlaceSearchListDispatch,
} from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';
import { useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';
import Pagination from '../common/Pagination';
import TextHighligher from '../common/TextHighligher';

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
      switch (status) {
        case kakao.maps.services.Status.OK:
          pListDispatch({
            type: 'set',
            payload: {
              data,
              pagination,
            },
          });
          break;
        default:
          pListDispatch({
            type: 'clear',
          });
          break;
      }
    });
  }, [keyword, ps, pListDispatch]);

  return (
    <div className="flex flex-col justify-between h-full px-2 py-3">
      <div>
        <input
          type="text"
          className="w-full px-2 py-2 border rounded-md"
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <div className="flex flex-col gap-1 p-2">
          <div className="text-end">
            검색결과: {pList?.pagination.totalCount ?? 0} 건
          </div>
          {pList ?
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
                  <TextHighligher keyword={keyword} text={e.place_name} />
                </div>
              );
            })
          : 
            <span className='text-gray-600'>검색결과가 없습니다</span>
          }
        </div>
      </div>
      <div className="flex justify-center pb-5">
        <Pagination
          currentPage={pList?.pagination.current ?? 1}
          totalPage={pList?.pagination.last ?? 0}
          handlePageClick={(n) => {
            pList?.pagination.gotoPage(n);
          }}
          handleNextClick={() => {
            pList?.pagination.nextPage();
          }}
          handlePrevClick={() => {
            pList?.pagination.prevPage();
          }}
        />
      </div>
    </div>
  );
}
