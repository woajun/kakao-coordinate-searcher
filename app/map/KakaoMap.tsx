'use client';

import Script from 'next/script';
import { useEffect, useRef, useState, useCallback } from 'react';
import { createRoot } from 'react-dom/client';

type Props = {
  handleMapClick?: (e: KakaoMapClickEvent, map: kakao.maps.Map) => void;
};

const KakaoMap = ({ handleMapClick = () => {} }: Props) => {
  const palette = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [map, setMap] = useState<kakao.maps.Map | null>(null);

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

  return (
    <>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=105b185094e8d46221227fd3ecff6497&autoload=false"
        onReady={() => {
          kakao.maps.load(() => {
            setIsLoaded(true);
          });
        }}
      />
      <div ref={palette} className="w-full h-full"></div>
    </>
  );
};

export default KakaoMap;

export function addMarker(map: kakao.maps.Map, position: kakao.maps.LatLng) {
  return new kakao.maps.Marker({map, position})
}

export function addOverlay(map: kakao.maps.Map, position: kakao.maps.LatLng, jsxElement: JSX.Element) {
  const content = document.createElement('div');
  const root = createRoot(content);
  root.render(jsxElement)
  return new kakao.maps.CustomOverlay({content, map, position})
}