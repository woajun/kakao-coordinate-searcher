/* eslint-disable react-hooks/exhaustive-deps */
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import {
  usePlaceSearchList,
  usePlaceSearchListDispatch,
} from '../stores/PlaceSearchList/PlaceSearchListContext';
import { useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';
import Pagination from '../common/Pagination';
import TextHighligher from '../common/TextHighligher';
import { useSelectedItemDispatch } from '../stores/SelectedItem/SelectedItemContext';
import { useRouter } from 'next/navigation';
import { useBoundsDispatch } from '../stores/Bounds/BoundsContext';
import History from './History';

export default function PlaceList() {
  const router = useRouter();
  const isLoaded = useIsLoadedMap();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [keyword, setKeyword] = useState('성수역');
  const pList = usePlaceSearchList();
  const pListDispatch = usePlaceSearchListDispatch();
  const moPlaceDispatch = useMouseOverPlaceDispatch();
  const sltItemDispatch = useSelectedItemDispatch();
  const boundsDispatch = useBoundsDispatch();

  useEffect(() => {
    if (!isLoaded) return;
    setPs(new kakao.maps.services.Places());
  }, [isLoaded]);

  const positions = useRef<kakao.maps.LatLng[]>([]);
  const changeMapBounds = () => {
    if (!boundsDispatch) return;
    boundsDispatch({
      type: 'apply',
      payload: { positions: positions.current },
    });
  };

  // 이전 선택 기록 보기
  const [showHistory, setShowHistory] = useState(false);

  const changeable = useRef(true);

  useEffect(() => {
    if (!ps || !pListDispatch) return;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      switch (status) {
        case kakao.maps.services.Status.OK:
          setShowHistory(false);
          pListDispatch({
            type: 'set',
            payload: {
              data,
              pagination,
            },
          });
          positions.current = data.map(
            (e) => new kakao.maps.LatLng(Number(e.y), Number(e.x))
          );
          if (changeable.current) {
            changeMapBounds();
            changeable.current = true;
          }
          break;
        default:
          pListDispatch({
            type: 'clear',
          });
          break;
      }
    });
  }, [keyword, ps, pListDispatch]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push('?drawer=false');
    changeMapBounds();
  };

  return (
    <div className="flex flex-col justify-between h-full px-2 py-3">
      <form onSubmit={handleSubmit} className="grow-0 pb-2">
        <input
          type="text"
          className="w-full px-2 py-2 border rounded-md"
          value={keyword}
          onChange={(e) => {
            changeable.current = false;
            setKeyword(e.target.value);
          }}
          placeholder="검색어를 입력하세요."
          onBlur={() => {
            changeable.current = true;
          }}
        />
      </form>
      {showHistory ? (
        <History handleClick={() => setShowHistory(false)} />
      ) : (
        <>
          <div className="flex flex-col gap-1 p-2 overflow-y-scroll grow">
            <div className="flex justify-between">
              <button
                className="text-xs border rounded-md bg-slate-500 text-white px-2 hover:bg-slate-400 active:bg-slate-500"
                onClick={() => setShowHistory(true)}
              >
                이전 선택 기록
              </button>
              <div className="text-sm text-slate-800">
                검색결과: {pList?.pagination.totalCount ?? 0} 건
              </div>
            </div>
            {pList ? (
              pList.data.map((e) => {
                return (
                  <div
                    key={e.id}
                    onClick={() => {
                      if (!sltItemDispatch) return;
                      const position = new kakao.maps.LatLng(
                        Number(e.y),
                        Number(e.x)
                      );
                      sltItemDispatch({
                        type: 'set',
                        payload: {
                          title: e.place_name,
                          position,
                          panto: true,
                        }
                      });
                    }}
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
            ) : (
              <span className="text-gray-600">검색결과가 없습니다</span>
            )}
          </div>
          <div className="flex justify-center pb-5 pt-1">
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
        </>
      )}
    </div>
  );
}
