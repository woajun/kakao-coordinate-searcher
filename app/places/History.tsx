import { MouseEventHandler } from "react";

type Props = {
  handleClick: MouseEventHandler<HTMLButtonElement>;
};
export default function History({handleClick}: Props) {
    return (
      <div>
        <button
          className="text-xs border rounded-md bg-slate-500 text-white px-2 hover:bg-slate-400 active:bg-slate-500"
          onClick={handleClick}
        >
          이전 선택 기록
        </button>
        이전 선택 기록이 없습니다.
      </div>
    );
}