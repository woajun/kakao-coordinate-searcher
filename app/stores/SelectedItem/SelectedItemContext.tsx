import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type SelectedItem = {
  title: string
  lat: string
  lng: string
}

const SelectedItemContext = createContext<SelectedItem|null>(null);

const SelectedItemDispatchContext = createContext<Dispatch<SetStateAction<SelectedItem | null>>| null>(null);

export const SelectedItemProvider = ({ children }: {children: ReactNode}) => {
  const [selectedItem, setSeletedItem] = useState<SelectedItem|null>(null)
  return (
    <SelectedItemContext.Provider value={selectedItem}>
      <SelectedItemDispatchContext.Provider value={setSeletedItem}>
        {children}
      </SelectedItemDispatchContext.Provider>
    </SelectedItemContext.Provider>
  )
}

export const useSelectedItem = () => {
  return useContext(SelectedItemContext);
}

export const useSelectedItemDispatch = () => {
  return useContext(SelectedItemDispatchContext);
}