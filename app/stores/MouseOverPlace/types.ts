import { SelectedItem } from '../SelectedItem/types';

export type MouseOverPlace = SelectedItem;

type SetAction = {
  type: 'set';
  payload: MouseOverPlace;
};

type ClearAction = {
  type: 'clear';
};

export type MouseOverPlaceAction =
  | SetAction
  | ClearAction;

type MouseOverPlaceDispatcher = {
  set: (item: MouseOverPlace) => void
  clear: () => void
};

export type MouseOverPlaceReducer = [MouseOverPlace | null, MouseOverPlaceDispatcher];
