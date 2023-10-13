import { ReactNode } from 'react';

function LeftArrowSvg() {
  return (
    <svg
      className="w-2.5 h-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M5 1 1 5l4 4"
      />
    </svg>
  );
}

function RightArrowSvg() {
  return (
    <svg
      className="w-2.5 h-2.5"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 6 10"
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="m1 9 4-4-4-4"
      />
    </svg>
  );
}

type PageButtonProps = {
  children: ReactNode;
  state?: 'active' | 'disable' | 'normal';
  className?: string;
};

function PageButton({ children, state = 'normal', className }: PageButtonProps) {
  return (
    <li>
      <a
        href="#"
        className={`${className} 
        ${
          state === 'active' &&
          'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
        }
        ${
          state === 'disable' &&
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-white border border-gray-300 cursor-default'
        }
        ${
          state === 'normal' &&
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        }
        `}
      >
        {children}
      </a>
    </li>
  );
}

type Props = {
  currentPage: number;
  totalPage: number;
  handlePageClick: (n: number) => void;
  handlePrevClick: () => void;
  handleNextClick: () => void;
};

export default function Pagination({
  currentPage,
  totalPage,
  handlePageClick,
  handlePrevClick,
  handleNextClick,
}: Props) {
  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center h-8 -space-x-px text-sm">
        <PageButton className="ml-0 rounded-l-lg">
          <span className="sr-only">Previous</span>
          <LeftArrowSvg />
        </PageButton>
        <PageButton>1</PageButton>
        <PageButton>2</PageButton>
        <PageButton state="active">3</PageButton>
        <PageButton>4</PageButton>
        <PageButton state="disable">5</PageButton>
        <PageButton className='rounded-r-lg'>
            <span className="sr-only">Next</span>
            <RightArrowSvg />
        </PageButton>
      </ul>
    </nav>
  );
}
