"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

const KakaoMap = () => {
  const palette = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (isLoaded && palette.current) {
      new daum.maps.Map(palette.current, {
        center: new daum.maps.LatLng(33.45071, 126.570667),
        level: 3,
      });
    }
  }, [isLoaded]);
  return (
    <>
      <Script
        src="//dapi.kakao.com/v2/maps/sdk.js?appkey=105b185094e8d46221227fd3ecff6497&autoload=false"
        onReady={() => {
          daum.maps.load(() => {
            setIsLoaded(true);
          });
        }}
      />
      <div ref={palette} style={{ width: "500px", height: "400px" }}></div>
    </>
  );
};

export default KakaoMap;
