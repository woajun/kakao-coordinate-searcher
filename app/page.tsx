'use client';

import KakaoMap from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { PlaceSearchListProvider } from './stores/PlaceSearchList/PlaceSearchListContext';
import { MouseOverPlaceProvider } from './stores/MouseOverPlace/MouseOverPlaceContext';
import { SelectedItemProvider } from './stores/SelectedItem/SelectedItemContext';
import { BoundsProvider } from './stores/Bounds/BoundsContext';
import { SnackbarProvider } from './stores/Snackbar/SnackbarContext';
import useHistoryReducer from './stores/History/useHistoryReducer';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const historyReducer = useHistoryReducer([]);
  return (
    <SnackbarProvider>
      <IsLoadedMapProvider>
        <PlaceSearchListProvider>
          <MouseOverPlaceProvider>
            <SelectedItemProvider>
              <BoundsProvider>
                <div className="flex flex-col w-screen h-screen">
                  <Nav drawer={drawer === 'true'} />
                  <div className="relative grow">
                    <Drawer drawer={drawer === 'true'}>
                      <PlaceList historyReducer={historyReducer} />
                    </Drawer>
                    <KakaoMap historyReducer={historyReducer} />
                  </div>
                </div>
              </BoundsProvider>
            </SelectedItemProvider>
          </MouseOverPlaceProvider>
        </PlaceSearchListProvider>
      </IsLoadedMapProvider>
    </SnackbarProvider>
  );
}
