/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import { usePlaceSearchList } from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';
import MouseOverOverlay from './MouseOverOverlay';
import { useMouseOverPlace, useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';
import { useSelectedItem, useSelectedItemDispatch } from '../stores/SelectedItem/SelectedItemContext';
import SlectedItemOverlay from './SlectedItemOverlay';
import { useBounds, useBoundsDispatch } from '../stores/Bounds/BoundsContext';

export function addMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
  return new kakao.maps.Marker({ map, position });
}

export function addOverlay(
  map: kakao.maps.Map,
  position: kakao.maps.LatLng,
  jsxElement: JSX.Element
) {
  const content = document.createElement('div');
  const root = createRoot(content);
  root.render(jsxElement);
  return new kakao.maps.CustomOverlay({ content, map, position });
}

const KakaoMap = () => {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const [showSnakbar, setShowSnakbar] = useState(false);

  // 선택된 장소 오버레이 생성
  const [sltOverlay, setSltOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const sltItem = useSelectedItem();
  const sltItemDispatch = useSelectedItemDispatch();
  useEffect(() => {
    sltOverlay?.setMap(null);
    if(!sltItem || !map) return
    setSltOverlay(addOverlay(map, sltItem.position, <SlectedItemOverlay position={sltItem.position} title={sltItem.title} handleCopyClick={async () => {
        setShowSnakbar(false);
        const text = `{latitude:${sltItem.position.getLat()},longitude:${sltItem.position.getLng()}}`;
        await navigator.clipboard.writeText(text);
        setShowSnakbar(true);
    }}/>))
    if (sltItem.panto) {
      map.panTo(sltItem.position);
    }
  }, [sltItem])

  // 스낵바 1.5초 후 닫기
  useEffect(() => {
    if (showSnakbar) {
      const timer = setTimeout(() => {
        setShowSnakbar(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [showSnakbar])

  // 카카오맵 API가 로드 되면 지도와 지도 클릭이벤트 생성
  const isLoaded = useIsLoadedMap();
  const palette = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoaded && palette.current && sltItemDispatch) {
      const { Map, LatLng, event } = kakao.maps;
      const aMap = new Map(palette.current, {
        center: new LatLng(37.543341, 127.052727),
        level: 4,
      });

      setMap(aMap);
      event.addListener(aMap, 'click', (e: KakaoMapClickEvent) => {
        sltItemDispatch({position: e.latLng, title: "클릭 위치"})
      });
    }
  }, [isLoaded]);

  // 마우스가 오버레이된 장소에 따라 커스텀 오버레이 생성
  const moPlaceDispathcer = useMouseOverPlaceDispatch();
  const moPlace = useMouseOverPlace();
  const [moOverlay, setMoOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  useEffect(() => {
    if(!map) return;
    moOverlay?.setMap(null);
    if (moPlace && moPlaceDispathcer && sltItemDispatch) {
      const p = new kakao.maps.LatLng(Number(moPlace.y), Number(moPlace.x));
      setMoOverlay(addOverlay(map, p, 
      <MouseOverOverlay 
        position={p} 
        place={moPlace} 
        handleMouseLeave={() => {
          moPlaceDispathcer({
            type: 'clear'
          })
        }}
        handleClick={() => {
          sltItemDispatch({
            position:p,
            title: moPlace.place_name,
          })
        }}
      />))
    }
  }, [moPlace])

  // 장소 검색 결과에 따라 지도에 마커 생성
  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([]);
  const pList = usePlaceSearchList();
  useEffect(() => {
    if (map && pList && moPlaceDispathcer && sltItemDispatch) {
      markers.forEach((marker) => marker.setMap(null));
      const aMarkers = pList.data.map((e) => {
        const position = new kakao.maps.LatLng(Number(e.y), Number(e.x));
        const marker = addMarker(map, position);
        kakao.maps.event.addListener(marker, 'mouseover', function () {
          moPlaceDispathcer({
            type: 'set',
            payload: {
              place: e,
            },
          });
        });
        kakao.maps.event.addListener(marker, 'click', function () {
          sltItemDispatch({
            position,
            title: e.place_name,
          });
        });
        return marker;
      });
      setMarkers(aMarkers);
    }
  }, [pList])

  // bounds 변경시 지도 범위 재설정
  const bounds = useBounds();
  const boundsDispatch = useBoundsDispatch();
  useEffect(() => {
    if (map && boundsDispatch && bounds.positions.length > 0) {
      const newBounds = new kakao.maps.LatLngBounds();
      bounds.positions.forEach((p) => newBounds.extend(p));
      map.setBounds(newBounds);
      boundsDispatch({ type: 'clear' });
    }
  }, [bounds])
  
  return (
    <>
      <div
        className={`${
          showSnakbar ? 'block' : 'hidden'
        } fixed z-50 px-5 py-2 text-white bg-blue-700 rounded-md left-1/2 top-5 opacity-90`}
      >
        복사 완료 ✔
      </div>
      <div ref={palette} className="w-full h-full"></div>
      <div
        className={`w-10 h-10 fixed flex justify-center items-center bottom-8 right-6 z-50 text-white bg-blue-700 hover:bg-blue-800 opacity-90 rounded-full`}
        onClick={() => {
          navigator.geolocation.getCurrentPosition((e) => {
            const lat = e.coords.latitude;
            const lng = e.coords.longitude;
            map?.panTo(new kakao.maps.LatLng(lat, lng))
          })
        }}
      >
        <span className="sr-only">Current Location</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      </div>
    </>
  );
};

export default KakaoMap;