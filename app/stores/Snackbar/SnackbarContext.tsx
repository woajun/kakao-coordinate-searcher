import {
  Dispatch, ReactNode, SetStateAction, createContext, useContext, useEffect, useState,
} from 'react';

const SnackbarContext = createContext<Dispatch<SetStateAction<boolean>> | null>(null);

export function SnackbarProvider({ children }: { children: ReactNode }) {
  const [showSnakbar, setShowSnakbar] = useState(false);

  useEffect(() => {
    if (showSnakbar) {
      const timer = setTimeout(() => {
        setShowSnakbar(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    return () => {};
  }, [showSnakbar]);

  return (
    <SnackbarContext.Provider value={setShowSnakbar}>
      <div
        className={`${
          showSnakbar ? 'block' : 'hidden'
        } fixed z-50 px-5 py-2 text-white bg-blue-700 rounded-md left-1/2 top-5 opacity-90 -translate-x-1/2`}
      >
        복사 완료 ✔
      </div>
      { children }
    </SnackbarContext.Provider>
  );
}

export const useSnackbar = () => useContext(SnackbarContext);
