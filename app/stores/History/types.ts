import { SelectedItem } from "../SelectedItem/types"

export type History = SelectedItem[]

type SetAction = {
    type: 'add'
    payload: SelectedItem
}

type ReplaceAction = {
    type: 'replace'
    payload: History 
}

type ClearAction = {
    type: 'clear';
}

export type HistoryAction = SetAction | ReplaceAction | ClearAction;