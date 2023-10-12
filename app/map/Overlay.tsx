import { MouseEventHandler } from 'react';

export default function Overlay({ position }: { position: kakao.maps.LatLng }) {
  const handleOverlayMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  const handleCopyClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    const text = `{latitude:${position.getLat()},longitude:${position.getLng()}}`;
    await navigator.clipboard.writeText(text);
    console.log('copied:', text);
  };

  return (
    <div className="arrow absolute bottom-0 translate-x-[-50%] z-50 pb-[9px]">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl"
        onMouseDown={handleOverlayMouseDown}
      >
        <h1 className="font-bold text-center">현위치</h1>
        <div className="pt-2">
          <div className="font-bold w-30">위도(latitude)</div>
          <span>{position.getLat()}</span>
        </div>
        <div>
          <div className="font-bold w-30">경도(longitude)</div>
          <span>{position.getLng()}</span>
        </div>
        <div className="flex justify-center pt-2">
          <button
            onClick={handleCopyClick}
            className="px-4 py-1 font-bold rounded-md bg-amber-300 hover:bg-amber-400 active:bg-amber-300"
          >
            복사
          </button>
        </div>
      </div>
    </div>
  );
}
