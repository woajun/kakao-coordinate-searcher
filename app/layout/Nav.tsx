import Image from "next/image";
import Link from "next/link";

type Props = {
  drawer: boolean
}

export default function Nav({drawer}: Props) {
  return (
    <nav className="relative flex h-12 bg-slate-100 items-center border-b border-slate-300">
      <div className="lg:hidden ps-2">
        <Link
          href={drawer ? '?drawer=false' : '?drawer=true'}
          className="flex border bg-slate-200 hover:bg-slate-300 rounded-md"
        >
          <Image alt="icon" src="/map-magnifying.svg" width="30" height="30" />
        </Link>
      </div>
      <div className="absolute -translate-x-1/2 left-1/2">
        <h1 className="flex items-center text-lg font-semibold text-slate-900">
          <Image
            className="lg:block hidden"
            alt="icon"
            src="/map-magnifying.svg"
            width="30"
            height="30"
          />
          <span>위경도 검색기</span>
        </h1>
      </div>
    </nav>
  );
}
