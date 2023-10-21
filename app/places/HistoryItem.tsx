import { MouseEventHandler } from 'react';
import {
  ClipboardSvg, MapSvg, XSvg,
} from '../svg';
import BlueButton from '../common/BlueButton';
import { HistoryItem } from '../stores/History/types';

type Props = {
  item: HistoryItem;
  position: kakao.maps.LatLng
  onMouseOver:MouseEventHandler<HTMLDivElement>
  onMouseLeave:MouseEventHandler<HTMLDivElement>
  onCopyClick:MouseEventHandler<HTMLButtonElement>
  onMapClick:MouseEventHandler<HTMLButtonElement>
  onCloseClick:MouseEventHandler<HTMLButtonElement>
};

function format(date: Date) {
  const start = new Date(date);
  const end = new Date();

  const diff = (end.getTime() - start.getTime()) / 1000;

  const times = [
    { name: '년', ms: 60 * 60 * 24 * 365 },
    { name: '개월', ms: 60 * 60 * 24 * 30 },
    { name: '일', ms: 60 * 60 * 24 },
    { name: '시간', ms: 60 * 60 },
    { name: '분', ms: 60 },
  ];

  const result = times.find((t) => Math.floor(diff / t.ms) > 0);

  if (result) {
    const betweenTime = Math.floor(diff / result.ms);
    return `${betweenTime}${result.name} 전`;
  }

  return '방금 전';
}

export default function PlaceListItem({
  item,
  onMouseOver,
  onMouseLeave,
  onCopyClick,
  onMapClick,
  onCloseClick,
}: Props) {
  return (
    <div
      className="flex justify-between p-1 rounded-md hover:bg-slate-100"
      onMouseOver={onMouseOver}
      onFocus={() => {}}
      onMouseLeave={onMouseLeave}
    >
      <div>
        <div className="text-sm font-semibold">{item.title}</div>
        <div className="text-xs">
          위도
          {item.position.getLat()}
        </div>
        <div className="text-xs">
          경도
          {item.position.getLng()}
        </div>
      </div>
      <div className="flex flex-col justify-between shrink-0">
        <p className="flex justify-end text-xs text-slate-600">
          {format(item.at)}
        </p>
        <div className="flex gap-1">
          <BlueButton onClick={onCopyClick}>
            <span className="sr-only">copy</span>
            <ClipboardSvg />
          </BlueButton>
          <BlueButton onClick={onMapClick}>
            <span className="sr-only">moveTo</span>
            <MapSvg />
          </BlueButton>
          <BlueButton onClick={onCloseClick}>
            <span className="sr-only">close</span>
            <XSvg />
          </BlueButton>
        </div>
      </div>
    </div>
  );
}
