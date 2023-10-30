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
import useHistoryState from './states/useHistoryState';
import useBoundState from './states/useBoundState';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const history = useHistoryState();
  const bound = useBoundState();
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
                history={history}
                bound={bound}
                placeSearchListReducer={placeSearchListReducer}
                selectedItemReducer={selectedItemReducer}
                mouseOverPlaceReducer={mouseOverPlaceReducer}
              />
            </Drawer>
            <KakaoMap
              history={history}
              bound={bound}
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
