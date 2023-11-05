'use client';

import {
  ReactNode, useEffect, useRef, useState,
} from 'react';
import { useIsLoadedMap } from '../stores/IsLoadedMap/IsLoadedMapContext';

type Props = {
  render: (map: kakao.maps.Map) => ReactNode
};

function KakaoMapContainer({ render }: Props) {
  const [map, setMap] = useState<kakao.maps.Map | null>(null);
  const isLoaded = useIsLoadedMap();
  const palette = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (isLoaded && palette.current) {
      const aMap = new kakao.maps.Map(palette.current, {
        center: new kakao.maps.LatLng(37.543341, 127.052727),
        level: 4,
      });
      setMap(aMap);
    }
  }, [isLoaded]);

  //   console.log(map);
  return (
    <>
      <div ref={palette} className="w-full h-full" />
      {map && render(map)}
    </>
  );
}

export default KakaoMapContainer;
