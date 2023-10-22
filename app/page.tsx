'use client';

import KakaoMap from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { MouseOverPlaceProvider } from './stores/MouseOverPlace/MouseOverPlaceContext';
import { SelectedItemProvider } from './stores/SelectedItem/SelectedItemContext';
import { SnackbarProvider } from './stores/Snackbar/SnackbarContext';
import useHistoryReducer from './stores/History/useHistoryReducer';
import useBoundReducer from './stores/Bound/useBoundReducer';
import usePlaceSearchListReducer from './stores/PlaceSearchList/usePlaceSearchListReducer';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const historyReducer = useHistoryReducer([]);
  const boudReducer = useBoundReducer();
  const placeSearchListReducer = usePlaceSearchListReducer();
  return (
    <SnackbarProvider>
      <IsLoadedMapProvider>
        <MouseOverPlaceProvider>
          <SelectedItemProvider>
            <div className="flex flex-col w-screen h-screen">
              <Nav drawer={drawer === 'true'} />
              <div className="relative grow">
                <Drawer drawer={drawer === 'true'}>
                  <PlaceList
                    historyReducer={historyReducer}
                    boundReducer={boudReducer}
                    placeSearchListReducer={placeSearchListReducer}
                  />
                </Drawer>
                <KakaoMap
                  historyReducer={historyReducer}
                  boundReducer={boudReducer}
                  placeSearchListReducer={placeSearchListReducer}
                />
              </div>
            </div>
          </SelectedItemProvider>
        </MouseOverPlaceProvider>
      </IsLoadedMapProvider>
    </SnackbarProvider>
  );
}
