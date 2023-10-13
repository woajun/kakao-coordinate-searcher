'use client';

import { useState } from 'react';
import KakaoMap, { addOverlay } from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { PlaceSearchListProvider } from './stores/PlaceSearchList.tsx/PlaceSearchListContext';
import Overlay from './map/Overlay';
import { MouseOverPlaceProvider } from './stores/MouseOverPlace/MouseOverPlaceContext';
import { SelectedItemProvider } from './stores/SelectedItem/SelectedItemContext';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const [overlay, setOverlay] = useState<kakao.maps.CustomOverlay | null>(null);
  const [showSnakbar, setShowSnakbar] = useState(false);

  const handleMapClick = (e: KakaoMapClickEvent, map: kakao.maps.Map) => {
    overlay?.setMap(null);
    setOverlay(addOverlay(map, e.latLng, <Overlay position={e.latLng} />));
  };

  const { drawer } = searchParams;
  return (
    <IsLoadedMapProvider>
      <PlaceSearchListProvider>
        <MouseOverPlaceProvider>
          <SelectedItemProvider>
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
          </SelectedItemProvider>
        </MouseOverPlaceProvider>
      </PlaceSearchListProvider>
    </IsLoadedMapProvider>
  );
}
