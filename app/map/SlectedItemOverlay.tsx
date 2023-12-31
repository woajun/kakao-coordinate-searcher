import { MouseEventHandler } from 'react';
import { ClipboardSvg } from '../svg';
import BlueButton from '../common/BlueButton';

type Props = {
  position: kakao.maps.LatLng;
  title: string;
  handleCopyClick: MouseEventHandler<HTMLButtonElement>;
};

export default function SlectedItemOverlay({ position, title, handleCopyClick }: Props) {
  return (
    <div className="arrow absolute bottom-0 -translate-x-1/2 pb-[9px] opacity-90">
      <div
        className="px-3 py-2 text-xs bg-white border-2 border-blue-400 cursor-auto rounded-xl"
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        <h1 className="font-bold text-center">{title}</h1>
        <div className="flex items-center gap-2">
          <div>
            <div className="pt-1">
              <span className="pr-1 font-bold w-30">위도</span>
              <span>{position.getLat()}</span>
            </div>
            <div>
              <span className="pr-1 font-bold w-30">경도</span>
              <span>{position.getLng()}</span>
            </div>
          </div>
          <BlueButton
            onClick={handleCopyClick}
          >
            <ClipboardSvg />
          </BlueButton>
        </div>
      </div>
    </div>
  );
}
