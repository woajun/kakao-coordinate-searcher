import { SelectedItem } from '../SelectedItem/types';

export interface HistoryItem extends SelectedItem {
  at: Date
  key: string
}

export type History = HistoryItem[];

type SetAction = {
  type: 'add'
  payload: { selectedItem: SelectedItem }
};

type ClearAction = {
  type: 'clear';
};

type RemoveAction = {
  type: 'remove'
  payload: { key: string }
};

export type HistoryAction = SetAction | ClearAction | RemoveAction;

type HistoryDispatcher = {
  add: (selectedItem: SelectedItem) => void;
  clear: () => void;
  remove: (key: string) => void;
};

export type HistoryReducer = [History, HistoryDispatcher];
