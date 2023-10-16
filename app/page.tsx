'use client';

import { useState } from 'react';
import KakaoMap, { addOverlay } from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { PlaceSearchListProvider } from './stores/PlaceSearchList/PlaceSearchListContext';
import { MouseOverPlaceProvider } from './stores/MouseOverPlace/MouseOverPlaceContext';
import { SelectedItemProvider } from './stores/SelectedItem/SelectedItemContext';
import { BoundsProvider } from './stores/Bounds/BoundsContext';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  return (
    <IsLoadedMapProvider>
      <PlaceSearchListProvider>
        <MouseOverPlaceProvider>
          <SelectedItemProvider>
            <BoundsProvider>
              <div className="flex flex-col w-screen h-screen">
                <Nav drawer={drawer === 'true'} />
                <div className="relative grow">
                  <Drawer drawer={drawer === 'true'}>
                    <PlaceList />
                  </Drawer>
                  <KakaoMap />
                </div>
              </div>
            </BoundsProvider>
          </SelectedItemProvider>
        </MouseOverPlaceProvider>
      </PlaceSearchListProvider>
    </IsLoadedMapProvider>
  );
}
