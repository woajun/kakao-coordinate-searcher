import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

type SelectedItem = {
  title: string
  position: kakao.maps.LatLng
  panto?: boolean
}

const SelectedItemContext = createContext<SelectedItem|null>(null);

const SelectedItemDispatchContext = createContext<Dispatch<SetStateAction<SelectedItem | null>>| null>(null);

export const SelectedItemProvider = ({ children }: {children: ReactNode}) => {
  const [selectedItem, setSeletedItem] = useState<SelectedItem|null>(null)

  const handleSetSlectedItem: Dispatch<SetStateAction<SelectedItem | null>> = (sltItem) => {
    console.log('apple')
    return setSeletedItem(sltItem);
  }
  return (
    <SelectedItemContext.Provider value={selectedItem}>
      <SelectedItemDispatchContext.Provider value={handleSetSlectedItem}>
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