import { MouseEventHandler } from 'react';
import { ClipboardSvg } from '../svg';

type Props = {
  position: kakao.maps.LatLng;
  title: string;
  handleCopyClick: MouseEventHandler<HTMLButtonElement>;
};


export default function SlectedItemOverlay({ position, title, handleCopyClick }: Props) {
  return (
    <div className="arrow absolute bottom-0 -translate-x-1/2 pb-[9px] opacity-90">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl text-xs border-blue-400"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
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
        <button 
          className='w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100'
          onClick={handleCopyClick}
        >
          <ClipboardSvg />
        </button>
        </div>
      </div>
    </div>
  );
}
