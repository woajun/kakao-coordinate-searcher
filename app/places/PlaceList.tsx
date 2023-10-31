/* eslint-disable react-hooks/exhaustive-deps */
import {
  FormEventHandler, useEffect, useState,
} from 'react';
import { useRouter } from 'next/navigation';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import Pagination from '../common/Pagination';
import History from './History';
import PlaceListItem from './PlaceListItem';
import { HistoryState } from '../states/useHistoryState';
import { BoundState } from '../states/useBoundState';
import { PlaceSearchListState } from '../states/usePlaceSearchListState';
import { SelectedItemState } from '../states/useSelectedItemState';
import { MouseOverPlaceState } from '../states/useMouseOverPlaceState';

type Props = {
  history: HistoryState
  bound: BoundState
  placeSearchList: PlaceSearchListState
  selectedItem: SelectedItemState
  mouseOverPlace: MouseOverPlaceState
};

export default function PlaceList({
  history, bound, placeSearchList, selectedItem, mouseOverPlace,
}: Props) {
  const router = useRouter();
  const isLoaded = useIsLoadedMap();
  const [ps, setPs] = useState<kakao.maps.services.Places>();
  const [keyword, setKeyword] = useState('성수역');

  useEffect(() => {
    if (!isLoaded) return;
    setPs(new kakao.maps.services.Places());
  }, [isLoaded]);

  // 이전 선택 기록 보기
  const [showHistory, setShowHistory] = useState(false);

  useEffect(() => {
    if (!ps) return;
    let isKeywordChange = true;
    ps.keywordSearch(keyword, (data, status, pagination) => {
      switch (status) {
        case kakao.maps.services.Status.OK: {
          setShowHistory(false);
          placeSearchList.set(data, pagination);
          const latlngs = data.map(
            ({ y, x }) => new kakao.maps.LatLng(Number(y), Number(x)),
          );
          if (!isKeywordChange) {
            bound.apply(latlngs);
          } else {
            bound.setLatLngs(latlngs);
          }
          break;
        }
        default: {
          placeSearchList.clear();
          break;
        }
      }
      isKeywordChange = false;
    });
  }, [ps, keyword]);

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    router.push('?drawer=false');
    bound.apply();
  };

  const pList = placeSearchList.get();

  return (
    <div className="flex flex-col justify-between h-full px-2 py-3">
      <form onSubmit={handleSubmit} className="pb-2 grow-0">
        <input
          type="text"
          className="w-full px-2 py-2 border rounded-md"
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
          placeholder="검색어를 입력하세요."
        />
      </form>
      {showHistory ? (
        <History
          history={history}
          handleClick={() => setShowHistory(false)}
          selectedItem={selectedItem}
          mouseOverPlace={mouseOverPlace}
        />
      ) : (
        <>
          <div className="flex flex-col gap-1 p-2 overflow-y-auto grow">
            <div className="flex justify-between">
              <button
                type="button"
                className="px-2 text-xs text-white border rounded-md bg-slate-500 hover:bg-slate-400 active:bg-slate-500"
                onClick={() => setShowHistory(true)}
              >
                이전 선택 기록
              </button>
              <div className="text-sm text-slate-800">
                검색결과:
                {' '}
                {pList?.pagination.totalCount ?? 0}
                {' '}
                건
              </div>
            </div>
            {pList ? (
              pList.data.map((e) => (
                <PlaceListItem
                  key={e.id}
                  title={e.place_name}
                  keyword={keyword}
                  position={new kakao.maps.LatLng(Number(e.y), Number(e.x))}
                  onClick={() => {
                    selectedItem.set({
                      title: e.place_name,
                      position: new kakao.maps.LatLng(
                        Number(e.y),
                        Number(e.x),
                      ),
                      panto: true,
                    });
                    router.push('?drawer=false');
                  }}
                  onMouseOver={() => {
                    mouseOverPlace.set({
                      title: e.place_name,
                      position: new kakao.maps.LatLng(
                        Number(e.y),
                        Number(e.x),
                      ),
                    });
                  }}
                  onMouseLeave={() => {
                    mouseOverPlace.set(null);
                  }}
                />
              ))
            ) : (
              <span className="text-gray-600">검색결과가 없습니다</span>
            )}
          </div>
          <div className="flex justify-center pt-1 pb-5">
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
