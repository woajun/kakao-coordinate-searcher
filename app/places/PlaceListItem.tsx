import { MouseEventHandler } from 'react';
import {
  ClipboardSvg, XSvg,
} from '../svg';
import BlueButton from '../common/BlueButton';
import TextHighligher from '../common/TextHighligher';
import { useSnackbar } from '../stores/Snackbar/SnackbarContext';

type Props = {
  title: string
  position: kakao.maps.LatLng
  at?: Date
  keyword?: string
  onMouseOver:MouseEventHandler<HTMLDivElement>
  onMouseLeave:MouseEventHandler<HTMLDivElement>
  onCloseClick?:MouseEventHandler<HTMLButtonElement>
  onClick:MouseEventHandler<HTMLDivElement>
};

function format(date: Date | undefined) {
  if (!date) return '';
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
  title,
  position,
  at,
  keyword,
  onMouseOver,
  onMouseLeave,
  onCloseClick,
  onClick,
}: Props) {
  const setShowSnakbar = useSnackbar();
  return (
    <div
      className="flex justify-between p-1 rounded-md hover:bg-slate-100"
      onMouseOver={onMouseOver}
      onFocus={() => {}}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div>
        <div className="text-sm font-semibold">
          {keyword ? <TextHighligher keyword={keyword} text={title} /> : title}
        </div>
        <div className="text-xs">
          위도
          {position.getLat()}
        </div>
        <div className="text-xs">
          경도
          {position.getLng()}
        </div>
      </div>
      <div className="flex flex-col justify-between shrink-0">
        <p className="flex justify-end text-xs text-slate-600">
          {format(at)}
        </p>
        <div className="flex gap-1">
          <BlueButton onClick={async () => {
            if (setShowSnakbar) {
              setShowSnakbar(false);
              const text = `{latitude:${position.getLat()},longitude:${position.getLng()}}`;
              await navigator.clipboard.writeText(text);
              setShowSnakbar(true);
            }
          }}
          >
            <span className="sr-only">copy</span>
            <ClipboardSvg />
          </BlueButton>
          {onCloseClick && (
          <BlueButton onClick={onCloseClick}>
            <span className="sr-only">close</span>
            <XSvg />
          </BlueButton>
          )}
        </div>
      </div>
    </div>
  );
}
