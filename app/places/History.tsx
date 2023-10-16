import { MouseEventHandler } from 'react';
import {
  useHistory,
  useHistoryDispatch,
} from '../stores/History/HistoryContext';
import { ClipboardSvg, LeftArrowSvg, MapSvg, XSvg } from '../svg';
import BlueButton from '../common/BlueButton';

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
    <div className="overflow-y-scroll grow">
      <div className="flex justify-between">
        <button
          className="flex items-center justify-center text-xs text-white border rounded-md bg-slate-500 w-7 h-7 hover:bg-slate-400 active:bg-slate-500"
          onClick={handleClick}
        >
          <LeftArrowSvg />
        </button>
        <button
          className="px-2 text-xs text-white border rounded-md bg-slate-500 hover:bg-slate-400 active:bg-slate-500"
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
                className="flex justify-between p-1 rounded-md hover:bg-slate-100"
              >
                <div>
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="text-xs">위도 {e.position.getLat()}</div>
                  <div className="text-xs">경도 {e.position.getLng()}</div>
                </div>
                <div className="flex flex-col justify-between shrink-0">
                  <p className="flex justify-end text-xs text-slate-600">
                    {format(e.at)}
                  </p>
                  <div className="flex gap-1">
                    <BlueButton
                      onClick={() => {}}
                    >
                      <ClipboardSvg />
                    </BlueButton>
                    <BlueButton
                      onClick={() => {}}
                    >
                      <MapSvg />
                    </BlueButton>
                    <BlueButton
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
                    </BlueButton>
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
