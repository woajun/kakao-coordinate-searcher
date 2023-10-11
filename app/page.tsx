'use client';

import { MouseEventHandler, useState } from 'react';
import KakaoMap, { addMarker, addOverlay } from './KakaoMap';

function Overlay(position: kakao.maps.LatLng) {
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="arrow absolute bottom-0 translate-x-[-50%] z-50 pb-[9px]">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl"
        onMouseDown={handleClick}
      >
        <h1 className="font-bold text-center">현위치</h1>
        <div className="pt-2">
          <div className="font-bold w-30">위도(latitude)</div>
          <span>{position.getLat()}</span>
        </div>
        <div>
          <div className="font-bold w-30">경도(longitude)</div>
          <span>{position.getLng()}</span>
        </div>
        <div className="flex justify-center pt-2">
          <button className="px-4 py-1 font-bold rounded-md bg-amber-300 hover:bg-amber-400 active:bg-amber-300">
            복사
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [overlay, setOverlay] = useState<kakao.maps.CustomOverlay | null>(null);

  const handleMapClick = (e: KakaoMapClickEvent, map: kakao.maps.Map) => {
    overlay?.setMap(null);
    setOverlay(addOverlay(map, e.latLng, Overlay(e.latLng)));
  };

  return (
    <>
      <h1>성수 팝업</h1>
      <KakaoMap handleMapClick={handleMapClick} />
    </>
  );
}
