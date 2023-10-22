'use client';

import KakaoMap from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { PlaceSearchListProvider } from './stores/PlaceSearchList/PlaceSearchListContext';
import { MouseOverPlaceProvider } from './stores/MouseOverPlace/MouseOverPlaceContext';
import { SelectedItemProvider } from './stores/SelectedItem/SelectedItemContext';
import { SnackbarProvider } from './stores/Snackbar/SnackbarContext';
import useHistoryReducer from './stores/History/useHistoryReducer';
import useBoundReducer from './stores/Bound/useBoundReducer';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const historyReducer = useHistoryReducer([]);
  const boudReducer = useBoundReducer([]);
  return (
    <SnackbarProvider>
      <IsLoadedMapProvider>
        <PlaceSearchListProvider>
          <MouseOverPlaceProvider>
            <SelectedItemProvider>
              <div className="flex flex-col w-screen h-screen">
                <Nav drawer={drawer === 'true'} />
                <div className="relative grow">
                  <Drawer drawer={drawer === 'true'}>
                    <PlaceList
                      historyReducer={historyReducer}
                      boundReducer={boudReducer}
                    />
                  </Drawer>
                  <KakaoMap
                    historyReducer={historyReducer}
                    boundReducer={boudReducer}
                  />
                </div>
              </div>
            </SelectedItemProvider>
          </MouseOverPlaceProvider>
        </PlaceSearchListProvider>
      </IsLoadedMapProvider>
    </SnackbarProvider>
  );
}
