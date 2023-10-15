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
  const palette = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoaded = useIsLoadedMap();

  const [sltOverlay, setSltOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const sltItem = useSelectedItem();
  const sltItemDispatch = useSelectedItemDispatch();

  useEffect(() => {
    sltOverlay?.setMap(null);
    if(!sltItem || !map) return
    setSltOverlay(addOverlay(map, sltItem.position, <SlectedItemOverlay position={sltItem.position} title={sltItem.title} />))
  }, [sltItem])

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

  const pList = usePlaceSearchList();

  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([])

  const moPlaceDispathcer = useMouseOverPlaceDispatch();
  const moPlace = useMouseOverPlace();

  const [moOverlay, setMoOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  useEffect(() => {
    if(!map) return;
    moOverlay?.setMap(null);
    if (moPlace && moPlaceDispathcer) {
      const p = new kakao.maps.LatLng(Number(moPlace.y), Number(moPlace.x));
      setMoOverlay(addOverlay(map, p, <MouseOverOverlay position={p} place={moPlace} handleMouseLeave={() => {
        moPlaceDispathcer({
          type: 'clear'
        })
      }}/>))
    }
  }, [moPlace])

  useEffect(() => {
    if (map && pList && moPlaceDispathcer) {
      markers.forEach((m) => m.setMap(null));
      const ms = pList.data.map((e) => {
        const m = addMarker(map, new kakao.maps.LatLng(Number(e.y), Number(e.x)))
        kakao.maps.event.addListener(m, 'mouseover', function () {
          moPlaceDispathcer({
            type: 'set',
            payload: {
              place: e
            }
          })
        });
        return m;
      }
      );
      setMarkers(ms);
    }
  }, [pList])

  return (
    <>
      <div ref={palette} className="w-full h-full"></div>
    </>
  );
};

export default KakaoMap;