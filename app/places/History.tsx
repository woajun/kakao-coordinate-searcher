import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import {
  LeftArrowSvg,
} from '../svg';
import HistoryItem from './PlaceListItem';
import { HistoryState } from '../states/useHistoryState';
import { SelectedItemState } from '../states/useSelectedItemState';
import { MouseOverPlaceState } from '../states/useMouseOverPlaceState';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  history: HistoryState
  selectedItem: SelectedItemState
  mouseOverPlace: MouseOverPlaceState
};

export default function History({
  handleClick, history, selectedItem, mouseOverPlace,
}: Props) {
  const router = useRouter();
  const histories = history.get();
  return (
    <div className="overflow-y-auto grow">
      <div className="flex justify-between">
        <button
          type="button"
          className="flex items-center justify-center text-xs text-white border rounded-md bg-slate-500 w-7 h-7 hover:bg-slate-400 active:bg-slate-500"
          onClick={handleClick}
        >
          <LeftArrowSvg />
        </button>
        <button
          type="button"
          className="px-2 text-xs text-white border rounded-md bg-slate-500 hover:bg-slate-400 active:bg-slate-500"
          onClick={() => {
            history.clear();
          }}
        >
          전체 삭제
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {histories.length > 0 ? (
          histories
            .map((e) => (
              <HistoryItem
                key={e.key}
                title={e.title}
                position={e.position}
                onClick={() => {
                  selectedItem.set({
                    title: e.title,
                    position: e.position,
                    panto: true,
                    noRecord: true,
                  });
                  router.push('?drawer=false');
                }}
                onMouseOver={() => {
                  mouseOverPlace.set(e);
                }}
                onMouseLeave={() => {
                  mouseOverPlace.set(null);
                }}
                onCloseClick={() => history.remove(e.key)}
              />
            ))
            .reverse()
        ) : (
          <span>이전 선택 기록이 없습니다.</span>
        )}
      </div>
    </div>
  );
}
