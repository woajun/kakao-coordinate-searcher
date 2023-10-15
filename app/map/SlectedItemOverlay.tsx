import { MouseEventHandler } from 'react';

type Props = {
  position: kakao.maps.LatLng;
  title: string;
};


export default function SlectedItemOverlay({ position, title }: Props) {
  const handleOverlayMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="arrow absolute bottom-0 -translate-x-1/2 pb-[9px] opacity-90">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl text-xs border-blue-400"
        onMouseDown={handleOverlayMouseDown}
      >
        <h1 className="font-bold text-center">{title}</h1>
        <div className='flex items-center gap-2'>
        <div>
          <div className="pt-1">
            <span className="font-bold w-30 pr-1">위도</span>
            <span>{position.getLat()}</span>
          </div>
          <div>
            <span className="font-bold w-30 pr-1">경도</span>
            <span>{position.getLng()}</span>
          </div>
        </div>
        <div className='w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100'>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
        </div>
        </div>
      </div>
    </div>
  );
}
