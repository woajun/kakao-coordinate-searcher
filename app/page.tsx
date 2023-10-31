'use client';

import KakaoMap from './map/KakaoMap';
import Nav from './layout/Nav';
import Drawer from './layout/Drawer';
import PlaceList from './places/PlaceList';
import { IsLoadedMapProvider } from './stores/IsLoadedMap/IsLoadedMapContext';
import { SnackbarProvider } from './stores/Snackbar/SnackbarContext';
import usePlaceSearchListState from './states/usePlaceSearchListState';
import useSelectedItemState from './states/useSelectedItemState';
import useMouseOverPlaceState from './states/useMouseOverPlaceState';
import useHistoryState from './states/useHistoryState';
import useBoundState from './states/useBoundState';

type Props = {
  searchParams: { [key: string]: string | string[] | undefined };
};

export default function Home({ searchParams }: Props) {
  const { drawer } = searchParams;
  const history = useHistoryState();
  const bound = useBoundState();
  const placeSearchList = usePlaceSearchListState();
  const selectedItem = useSelectedItemState();
  const mouseOverPlace = useMouseOverPlaceState();
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
                placeSearchList={placeSearchList}
                selectedItem={selectedItem}
                mouseOverPlace={mouseOverPlace}
              />
            </Drawer>
            <KakaoMap
              history={history}
              bound={bound}
              placeSearchList={placeSearchList}
              selectedItem={selectedItem}
              mouseOverPlace={mouseOverPlace}
            />
          </div>
        </div>
      </IsLoadedMapProvider>
    </SnackbarProvider>
  );
}
