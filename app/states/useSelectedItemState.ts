import { useState } from 'react';

export type SelectedItem = {
  title: string
  position: kakao.maps.LatLng
  panto?: boolean
  noRecord?: boolean
};

export type SelectedItemState = {
  get: () => SelectedItem | null
  set: (item: SelectedItem) => void
};

export default function useSelectedItemState(): SelectedItemState {
  const [selectedItem, setSelectedItem] = useState<SelectedItem | null>(null);
  return {
    get: () => selectedItem,
    set: (item) => {
      setSelectedItem(item);
    },
  };
}
