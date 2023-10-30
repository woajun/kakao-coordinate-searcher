'use client';

import KakaoMap from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { SnackbarProvider } from './stores/Snackbar/SnackbarContext';
import usePlaceSearchListReducer from './stores/PlaceSearchList/usePlaceSearchListReducer';
import useSelectedItemReducer from './stores/SelectedItem/useSelectedItemReducer';
import useMouseOverPlaceReducer from './stores/MouseOverPlace/MouseOverPlaceContext';
import useHistoryActions from './states/history';
import useBoundReducer from './states/bound/useBoundReducer';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const historyActions = useHistoryActions();
  const boudReducer = useBoundReducer();
  const placeSearchListReducer = usePlaceSearchListReducer();
  const selectedItemReducer = useSelectedItemReducer();
  const mouseOverPlaceReducer = useMouseOverPlaceReducer();
  return (
    <SnackbarProvider>
      <IsLoadedMapProvider>
        <div className="flex flex-col w-screen h-screen">
          <Nav drawer={drawer === 'true'} />
          <div className="relative grow">
            <Drawer drawer={drawer === 'true'}>
              <PlaceList
                historyActions={historyActions}
                boundReducer={boudReducer}
                placeSearchListReducer={placeSearchListReducer}
                selectedItemReducer={selectedItemReducer}
                mouseOverPlaceReducer={mouseOverPlaceReducer}
              />
            </Drawer>
            <KakaoMap
              historyActions={historyActions}
              boundReducer={boudReducer}
              placeSearchListReducer={placeSearchListReducer}
              selectedItemReducer={selectedItemReducer}
              mouseOverPlaceReducer={mouseOverPlaceReducer}
            />
          </div>
        </div>
      </IsLoadedMapProvider>
    </SnackbarProvider>
  );
}
