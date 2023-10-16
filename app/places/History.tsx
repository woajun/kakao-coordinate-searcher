import { MouseEventHandler } from 'react';
import {
  useHistory,
  useHistoryDispatch,
} from '../stores/History/HistoryContext';
import { ClipboardSvg, LeftArrowSvg, MapSvg, XSvg } from '../svg';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

function format(date: Date) {
  const start = new Date(date);
  const end = new Date();

  const diff = (end.getTime() - start.getTime()) / 1000;

  const times = [
    { name: '년', milliSeconds: 60 * 60 * 24 * 365 },
    { name: '개월', milliSeconds: 60 * 60 * 24 * 30 },
    { name: '일', milliSeconds: 60 * 60 * 24 },
    { name: '시간', milliSeconds: 60 * 60 },
    { name: '분', milliSeconds: 60 },
  ];

  for (const value of times) {
    const betweenTime = Math.floor(diff / value.milliSeconds);

    if (betweenTime > 0) {
      return `${betweenTime}${value.name} 전`;
    }
  }
  return '방금 전';
}

export default function History({ handleClick }: Props) {
  const history = useHistory();
  const historyDispatch = useHistoryDispatch();
  return (
    <div className="grow overflow-y-scroll">
      <div className="flex justify-between">
        <button
          className="text-xs border rounded-md bg-slate-500 text-white w-7 h-7 hover:bg-slate-400 active:bg-slate-500 flex justify-center items-center"
          onClick={handleClick}
        >
          <LeftArrowSvg />
        </button>
        <button
          className="text-xs border rounded-md bg-slate-500 text-white px-2 hover:bg-slate-400 active:bg-slate-500"
          onClick={() => {
            historyDispatch!({
              type: 'clear',
            });
          }}
        >
          전체 삭제
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {history.length > 0 ? (
          history
            .map((e) => (
              <div
                key={e.key}
                className="flex justify-between hover:bg-slate-100 p-1 rounded-md"
              >
                <div>
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="text-xs">위도 {e.position.getLat()}</div>
                  <div className="text-xs">경도 {e.position.getLng()}</div>
                </div>
                <div className="flex flex-col justify-between shrink-0">
                  <div className="text-xs flex justify-end text-slate-600">
                    {format(e.at)}
                  </div>
                  <div className="flex gap-1">
                    <button
                      className="w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100"
                      onClick={() => {}}
                    >
                      <ClipboardSvg />
                    </button>
                    <button
                      className="w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100"
                      onClick={() => {}}
                    >
                      <MapSvg />
                    </button>
                    <button
                      className="w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100"
                      onClick={() => {
                        if (historyDispatch) {
                          historyDispatch({
                            type: 'replace',
                            payload: history.filter(
                              (item) => item.key !== e.key
                            ),
                          });
                        }
                      }}
                    >
                      <XSvg />
                    </button>
                  </div>
                </div>
              </div>
            ))
            .reverse()
        ) : (
          <span>이전 선택 기록이 없습니다.</span>
        )}
      </div>
    </div>
  );
}
