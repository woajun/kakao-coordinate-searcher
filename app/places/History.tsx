import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import {
  LeftArrowSvg,
} from '../svg';
import HistoryItem from './PlaceListItem';
import { HistoryReducer } from '../stores/History/types';
import { SelectedItemReducer } from '../stores/SelectedItem/types';
import { MouseOverPlaceReducer } from '../stores/MouseOverPlace/types';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  historyReducer: HistoryReducer
  selectedItemReducer: SelectedItemReducer
  mouseOverPlaceReducer: MouseOverPlaceReducer
};

export default function History({
  handleClick, historyReducer, selectedItemReducer, mouseOverPlaceReducer,
}: Props) {
  const [history, historyDispatcher] = historyReducer;
  const router = useRouter();
  const sltItemDispatch = selectedItemReducer[1];
  const moPlaceDispatch = mouseOverPlaceReducer[1];
  return (
    <div className="overflow-y-scroll grow">
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
            historyDispatcher.clear();
          }}
        >
          전체 삭제
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {history.length > 0 ? (
          history
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
                onCloseClick={() => historyDispatcher.remove(e.key)}
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
