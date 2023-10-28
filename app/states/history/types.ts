import { SelectedItem } from '@/app/stores/SelectedItem/types';

export interface HistoryItem extends SelectedItem {
  at: Date
  key: string
}

export type History = HistoryItem[];

export type HistoryActions = {
  get: () => History;
  add: (selectedItem: SelectedItem) => void;
  clear: () => void;
  remove: (key: string) => void;
};
