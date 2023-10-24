import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import {
  LeftArrowSvg,
} from '../svg';
import HistoryItem from './PlaceListItem';
import { HistoryActions } from '../stores/History/types';
import { SelectedItemReducer } from '../stores/SelectedItem/types';
import { MouseOverPlaceReducer } from '../stores/MouseOverPlace/types';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  historyActions: HistoryActions
  selectedItemReducer: SelectedItemReducer
  mouseOverPlaceReducer: MouseOverPlaceReducer
};

export default function History({
  handleClick, historyActions, selectedItemReducer, mouseOverPlaceReducer,
}: Props) {
  const router = useRouter();
  const sltItemDispatch = selectedItemReducer[1];
  const moPlaceDispatch = mouseOverPlaceReducer[1];
  const histories = historyActions.get();
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
            historyActions.clear();
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
                  sltItemDispatch.set({
                    title: e.title,
                    position: e.position,
                    panto: true,
                    noRecord: true,
                  });
                  router.push('?drawer=false');
                }}
                onMouseOver={() => {
                  moPlaceDispatch.set(e);
                }}
                onMouseLeave={() => {
                  moPlaceDispatch.clear();
                }}
                onCloseClick={() => historyActions.remove(e.key)}
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
