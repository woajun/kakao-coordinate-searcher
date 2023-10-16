import { MouseEventHandler } from 'react';
import { useHistory } from '../stores/History/HistoryContext';

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
};

function format(date:Date) {
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
  return (
    <div className="grow overflow-y-scroll">
      <button
        className="text-xs border rounded-md bg-slate-500 text-white px-2 hover:bg-slate-400 active:bg-slate-500"
        onClick={handleClick}
      >
        left arrow
      </button>
      <button
        className="text-xs border rounded-md bg-slate-500 text-white px-2 hover:bg-slate-400 active:bg-slate-500"
        onClick={handleClick}
      >
        전체 삭제
      </button>
      <div className="flex flex-col gap-2">
        {history.length > 0 ? (
          history.map((e) => (
            <div key={e.key} className="flex justify-between">
              <div>
                <div className="text-sm">{e.title}</div>
                <div className="text-xs">위도 {e.position.getLat()}</div>
                <div className="text-xs">경도 {e.position.getLng()}</div>
              </div>
              <div className="flex flex-col items-center shrink-0">
                <div className="text-xs flex">
                  {format(e.at)}
                </div>
                <div className="flex">
                  <div>복사</div>
                  <div>이동</div>
                  <div>삭제</div>
                </div>
              </div>
            </div>
          )).reverse()
        ) : (
          <span>이전 선택 기록이 없습니다.</span>
        )}
      </div>
    </div>
  );
}
