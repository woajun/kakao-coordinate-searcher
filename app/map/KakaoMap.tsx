'use client';

import {
  useEffect, useRef, useState,
} from 'react';
import { createRoot } from 'react-dom/client';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import MouseOverOverlay from './MouseOverOverlay';
import SlectedItemOverlay from './SlectedItemOverlay';
import { MarkerSvg } from '../svg';
import { useSnackbar } from '../stores/Snackbar/SnackbarContext';
import { PlaceSearchListReducer } from '../stores/PlaceSearchList/types';
import { SelectedItemReducer } from '../stores/SelectedItem/types';
import { MouseOverPlaceReducer } from '../stores/MouseOverPlace/types';
import { BoundState } from '../states/useBoundState';
import { HistoryState } from '../states/useHistoryState';

function createMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
  return new kakao.maps.Marker({ map, position });
}

function createOverlay(
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  jsxElement: JSX.Element,
) {
  const content = document.createElement('div');
  const root = createRoot(content);
  root.render(jsxElement);
  return new kakao.maps.CustomOverlay({ content, map, position });
}

type Props = {
  history: HistoryState
  bound: BoundState
  placeSearchListReducer: PlaceSearchListReducer
  selectedItemReducer: SelectedItemReducer
  mouseOverPlaceReducer: MouseOverPlaceReducer
};

function KakaoMap({
  history, bound, placeSearchListReducer, selectedItemReducer, mouseOverPlaceReducer,
}: Props) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

  // 선택된 장소 오버레이 생성
  const [sltOverlay, setSltOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const [sltItem, sltItemDispatch] = selectedItemReducer;
  const setShowSnakbar = useSnackbar();
  useEffect(() => {
    sltOverlay?.setMap(null);
    if (!sltItem || !map || !setShowSnakbar) return;
    const newSelectedItemOverlay = createOverlay(
      map,
      sltItem.position,
      <SlectedItemOverlay
        position={sltItem.position}
        title={sltItem.title}
        handleCopyClick={async () => {
          setShowSnakbar(false);
          const text = `{latitude:${sltItem.position.getLat()},longitude:${sltItem.position.getLng()}}`;
          await navigator.clipboard.writeText(text);
          setShowSnakbar(true);
        }}
      />,
    );
    setSltOverlay(newSelectedItemOverlay);
    if (sltItem.panto) {
      map.panTo(sltItem.position);
    }
    if (!sltItem.noRecord) {
      history.add(sltItem);
    }
  }, [sltItem]);

  // 카카오맵 API가 로드 되면 지도와 지도 클릭이벤트 생성
  const isLoaded = useIsLoadedMap();
  const palette = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoaded && palette.current) {
      const { Map, LatLng, event } = kakao.maps;
      const aMap = new Map(palette.current, {
        center: new LatLng(37.543341, 127.052727),
        level: 4,
      });

      setMap(aMap);
      event.addListener(aMap, 'click', (e: KakaoMapClickEvent) => {
        sltItemDispatch.set({
          position: e.latLng, title: '클릭 위치',
        });
      });
    }
  }, [isLoaded]);

  // 마우스가 오버레이된 장소에 따라 커스텀 오버레이 생성
  const [moPlace, moPlaceDispathcer] = mouseOverPlaceReducer;

  const [moOverlay, setMoOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  useEffect(() => {
    if (!map) return;
    moOverlay?.setMap(null);
    if (moPlace) {
      const newMouseOverOverlay = createOverlay(
        map,
        moPlace.position,
        <MouseOverOverlay
          position={moPlace.position}
          title={moPlace.title}
          handleMouseLeave={() => {
            moPlaceDispathcer.clear();
          }}
          handleClick={() => {
            sltItemDispatch.set({
              position: moPlace.position,
              title: moPlace.title,
            });
          }}
        />,
      );
      setMoOverlay(newMouseOverOverlay);
    }
  }, [moPlace]);

  // 장소 검색 결과에 따라 지도에 마커 생성
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const pList = placeSearchListReducer[0];
  useEffect(() => {
    if (map && pList) {
      markers.forEach((marker) => marker.setMap(null));
      const aMarkers = pList.data.map((e) => {
        const position = new kakao.maps.LatLng(Number(e.y), Number(e.x));
        const marker = createMarker(map, position);
        kakao.maps.event.addListener(marker, 'mouseover', () => {
          moPlaceDispathcer.set({
            title: e.place_name,
            position,
          });
        });
        kakao.maps.event.addListener(marker, 'click', () => {
          sltItemDispatch.set({
            position,
            title: e.place_name,
          });
        });
        return marker;
      });
      setMarkers(aMarkers);
    }
  }, [pList]);

  // bound 변경시 지도 범위 재설정
  useEffect(() => {
    bound.apply(map);
  }, [bound.get()]);

  // 현재 위치로 이동 클릭
  const [currentOverlay, setCurrentOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const handleCurLocationClick = () => {
    if (!map) return;
    navigator.geolocation.getCurrentPosition((e) => {
      const { latitude, longitude } = e.coords;
      const p = new kakao.maps.LatLng(latitude, longitude);
      map.panTo(p);
      currentOverlay?.setMap(null);
      const newCurrentOverlay = createOverlay(
        map,
        p,
        <div className="w-3 h-3 bg-red-500 border border-red-300 rounded-full">
          <span className="sr-only">Current Spot</span>
        </div>,
      );
      setCurrentOverlay(newCurrentOverlay);
    });
  };

  return (
    <>
      <div ref={palette} className="w-full h-full" />
      <button
        type="button"
        className="w-10 h-10 fixed flex justify-center items-center bottom-8 right-6 z-10 text-white bg-blue-700 hover:bg-blue-800 opacity-90 rounded-full active:ring-4"
        onClick={handleCurLocationClick}
      >
        <span className="sr-only">Current Location</span>
        <MarkerSvg />
      </button>
    </>
  );
}

export default KakaoMap;
