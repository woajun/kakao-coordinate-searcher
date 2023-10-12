/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';
import { usePlaceSearchList } from '../stores/PlaceSearchList.tsx/PlaceSearchListContext';
import Overlay from './Overlay';
import { useMouseOverPlace, useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';

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

type Props = {
  handleMapClick?: (e: KakaoMapClickEvent, map: kakao.maps.Map) => void;
};

const KakaoMap = ({ handleMapClick = () => {} }: Props) => {
  const palette = useRef<HTMLDivElement | null>(null);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoaded = useIsLoadedMap();

  useEffect(() => {
    if (isLoaded && palette.current) {
      const { Map, LatLng } = kakao.maps;
      const aMap = new Map(palette.current, {
        center: new LatLng(37.543341, 127.052727),
        level: 4,
      });

      setMap(aMap);
    }
  }, [isLoaded]);

  const clickEvent = useRef<(e: KakaoMapClickEvent) => void>(() => {});
  const mapClickHandler = useCallback((e: KakaoMapClickEvent) => {
    if (map) {
      handleMapClick(e, map);
    }
  }, [handleMapClick, map])

  useEffect(() => {
    if (map) {
      const { event } = kakao.maps;
      event.removeListener(map, 'click', clickEvent.current);
      event.addListener(map, 'click', mapClickHandler);
      clickEvent.current = mapClickHandler;
    }
  }, [mapClickHandler, map]);

  const pList = usePlaceSearchList();

  const [markers, setMarkers] = useState<kakao.maps.Marker[]>([])

  const moPlaceDispathcer = useMouseOverPlaceDispatch();
  const moPlace = useMouseOverPlace();

  const [moOverlay, setOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  useEffect(() => {
    if(!map || !moPlace) return;
    moOverlay?.setMap(null);
    const p = new kakao.maps.LatLng(Number(moPlace.y), Number(moPlace.x));
    setOverlay(addOverlay(map, p, <Overlay position={p}/>))
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

        kakao.maps.event.addListener(m, 'mouseout', function () {
          moPlaceDispathcer({
            type: 'clear'
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