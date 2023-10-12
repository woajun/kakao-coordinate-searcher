import Link from "next/link";

type Props = {
  drawer: boolean
}

export default function Nav({drawer}: Props) {
  return (
    <nav className="relative flex h-8">
      <div className="lg:hidden">
        <Link href={drawer ? "?drawer=false" : "?drawer=true"} className="flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 10h16M4 14h16M4 18h16"
            ></path>
          </svg>
          키워드 검색
        </Link>
      </div>
      <div className="absolute -translate-x-1/2 left-1/2">
      <h1>위경도 검색</h1>
      </div>
    </nav>
  );
}
