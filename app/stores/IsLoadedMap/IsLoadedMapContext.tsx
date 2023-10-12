import { ReactNode, createContext, useContext, useState } from 'react';
import Script from 'next/script';

const isLoadedMapContext = createContext(false);

type Props = {
  children: ReactNode;
};

export const IsLoadedMapProvider = ({ children }: Props) => {
  const [isLoadedMap, setIsLoadedMap] = useState(false);
  return (
    <>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=105b185094e8d46221227fd3ecff6497&autoload=false&libraries=services"
        onReady={() => {
          kakao.maps.load(() => {
            setIsLoadedMap(true);
          });
        }}
      />
      <isLoadedMapContext.Provider value={isLoadedMap}>
        {children}
      </isLoadedMapContext.Provider>
    </>
  );
};

export const useIsLoadedMap = () => {
  return useContext(isLoadedMapContext);
};
