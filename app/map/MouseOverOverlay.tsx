import { MouseEventHandler } from 'react';

type Props = {
  position: kakao.maps.LatLng;
  place: kakao.maps.services.PlacesSearchResultItem;
  handleMouseLeave: MouseEventHandler<HTMLDivElement>;
  handleClick: MouseEventHandler<HTMLDivElement>;
};


export default function Overlay({ position, place, handleMouseLeave, handleClick }: Props) {
  const handleOverlayMouseDown: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="arrow absolute bottom-0 -translate-x-1/2 pb-[9px] opacity-90">
      <div
        className="px-3 py-2 bg-white border-2 cursor-auto rounded-xl text-xs"
        onClick={handleClick}
        onMouseDown={handleOverlayMouseDown}
        onMouseLeave={handleMouseLeave}
      >
        <h1 className="font-bold text-center">{place.place_name}</h1>
        <div className="pt-1">
          <span className="font-bold w-30">위도</span>
          <span>{position.getLat()}</span>
        </div>
        <div>
          <span className="font-bold w-30">경도</span>
          <span>{position.getLng()}</span>
        </div>
      </div>
    </div>
  );
}
