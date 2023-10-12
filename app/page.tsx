'use client';

import { MouseEventHandler, useState } from 'react';
import KakaoMap, { addOverlay } from './map/KakaoMap';
import Nav from './layout/Nav';
import Link from 'next/link';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { PlaceSearchListProvider } from './stores/PlaceSearchList.tsx/PlaceSearchListContext';

function Overlay(position: kakao.maps.LatLng) {
  const handleOverlayMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleCopyClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const text = `{latitude:${position.getLat()},longitude:${position.getLng()}}`;
    await navigator.clipboard.writeText(text);
    console.log('copied:', text);
  };

  return (
    <div className="arrow absolute bottom-0 translate-x-[-50%] z-50 pb-[9px]">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl"
        onMouseDown={handleOverlayMouseDown}
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
          <button
            onClick={handleCopyClick}
            className="px-4 py-1 font-bold rounded-md bg-amber-300 hover:bg-amber-400 active:bg-amber-300"
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const [overlay, setOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const [showSnakbar, setShowSnakbar] = useState(false);

  const handleMapClick = (e: KakaoMapClickEvent, map: kakao.maps.Map) => {
    overlay?.setMap(null);
    setOverlay(addOverlay(map, e.latLng, Overlay(e.latLng)));
  };

  const { drawer } = searchParams;
  return (
    <>
      <IsLoadedMapProvider>
        <PlaceSearchListProvider>
          <div className="flex flex-col w-screen h-screen">
            <Nav drawer={drawer === 'true'} />
            <div
              className={`${
                showSnakbar && 'block'
              } hidden fixed z-50 px-5 py-2 text-white bg-blue-700 rounded-md left-1/2 top-5 opacity-90`}
            >
              복사 완료 ✔
            </div>
            <div className="relative grow">
              <Drawer drawer={drawer === 'true'}>
                <PlaceList />
              </Drawer>
              <KakaoMap handleMapClick={handleMapClick} />
            </div>
          </div>
        </PlaceSearchListProvider>
      </IsLoadedMapProvider>
    </>
  );
}
