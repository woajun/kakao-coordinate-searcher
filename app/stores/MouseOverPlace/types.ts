import { SelectedItem } from '../SelectedItem/types';

type SetAction = {
  type: 'set';
  payload: SelectedItem;
};

type ClearAction = {
  type: 'clear';
};

export type MouseOverPlaceAction =
  | SetAction
  | ClearAction;
