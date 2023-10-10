"use client"

import KakaoMap from "./KakaoMap";
import { useState } from 'react';

export default function Home() {
  const handleMapClick = (e: KakaoMapClickEvent) => {
    console.log("hellow");
  }
  const handleMapClick2 = (e: KakaoMapClickEvent) => {
    console.log("안녕");
  }

  const [apple, setApple] = useState(false); 
  return (
    <>
    <button onClick={() => setApple(!apple)}>
      event change
    </button>
      <h1>성수 팝업</h1>
      <KakaoMap handleMapClick={apple?handleMapClick: handleMapClick2}></KakaoMap>
    </>
  );
}
