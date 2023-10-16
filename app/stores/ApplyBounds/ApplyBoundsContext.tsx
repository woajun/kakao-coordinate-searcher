import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";

const ApplyBoundsContext = createContext(false);

const ApplyBoundsDispatchContext = createContext<Dispatch<SetStateAction<boolean>>| null>(null);

export const ApplyBoundsProvider = ({ children }: {children: ReactNode}) => {
  const [applyBounds, setApplyBounds] = useState(false)
  return (
    <ApplyBoundsContext.Provider value={applyBounds}>
      <ApplyBoundsDispatchContext.Provider value={setApplyBounds}>
        {children}
      </ApplyBoundsDispatchContext.Provider>
    </ApplyBoundsContext.Provider>
  )
}

export const useApplyBounds = () => {
  return useContext(ApplyBoundsContext);
}

export const useApplyBoundsDispatch = () => {
  return useContext(ApplyBoundsDispatchContext);
}