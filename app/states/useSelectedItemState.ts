import { useState } from 'react';

export type SelectedItem = {
  title: string
  position: kakao.maps.LatLng
  panto?: boolean
  noRecord?: boolean
};

export type SelectedItemState = {
  get: () => SelectedItem | null
  set: (title: string,
    position: kakao.maps.LatLng,
    panto?: boolean,
    noRecord?: boolean) => void
};

export default function useSelectedItemState(): SelectedItemState {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  return {
    get: () => selectedItem,
    set: (title, position, panto = false, noRecord = false) => {
      setSelectedItem({
        title, position, panto, noRecord,
      });
    },
  };
}
