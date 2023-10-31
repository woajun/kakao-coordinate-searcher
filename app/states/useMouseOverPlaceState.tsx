import { useState } from 'react';
import { SelectedItem } from './useSelectedItemState';

export type MouseOverPlace = SelectedItem;

export type MouseOverPlaceState = {
  get: () => MouseOverPlace | null
  set: (item: MouseOverPlace | null) => void
};

export default function useMouseOverPlaceState(): MouseOverPlaceState {
  const [mouseOverPlace, setMouseOverPlace] = useState<MouseOverPlace | null>(null);

  return {
    get: () => mouseOverPlace,
    set: (item) => {
      setMouseOverPlace(item);
    },
  };
}
