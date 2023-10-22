import { MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import {
  LeftArrowSvg,
} from '../svg';
import { useSelectedItemDispatch } from '../stores/SelectedItem/SelectedItemContext';
import { useMouseOverPlaceDispatch } from '../stores/MouseOverPlace/MouseOverPlaceContext';
import { useSnackbar } from '../stores/Snackbar/SnackbarContext';
import HistoryItem from './HistoryItem';
import { HistoryReducer } from '../stores/History/types';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
  historyReducer: HistoryReducer
};

export default function History({ handleClick, historyReducer }: Props) {
  const [history, historyDispatch] = historyReducer;
  const router = useRouter();
  const sltItemDispatch = useSelectedItemDispatch();
  const moPlaceDispatch = useMouseOverPlaceDispatch();
  const setShowSnakbar = useSnackbar();
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
            historyDispatch.clear();
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
                item={e}
                position={e.position}
                onMouseOver={() => {
                  if (!moPlaceDispatch) return;
                  moPlaceDispatch({ type: 'set', payload: e });
                }}
                onMouseLeave={() => {
                  if (!moPlaceDispatch) return;
                  moPlaceDispatch({ type: 'clear' });
                }}
                onCopyClick={async () => {
                  if (setShowSnakbar) {
                    setShowSnakbar(false);
                    const text = `{latitude:${e.position.getLat()},longitude:${e.position.getLng()}}`;
                    await navigator.clipboard.writeText(text);
                    setShowSnakbar(true);
                  }
                }}
                onMapClick={() => {
                  if (sltItemDispatch) {
                    sltItemDispatch!({
                      type: 'set',
                      payload: { ...e, panto: true, noRecord: true },
                    });
                    router.push('?drawer=false');
                  }
                }}
                onCloseClick={() => {
                  historyDispatch.remove(e.key);
                }}
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
