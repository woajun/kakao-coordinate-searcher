import { SelectedItem } from "../SelectedItem/types"

interface HistoryItem extends SelectedItem {
    at: Date
    key: string
}

export type History = HistoryItem[]

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