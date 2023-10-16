import { ReactNode } from 'react';
import { LeftArrowSvg, RightArrowSvg } from '../svg';

type PageButtonProps = {
  children: ReactNode;
  state?: 'active' | 'disabled' | 'normal';
  className?: string;
  onClick?: () => void;
};

function PageButton({
  children,
  state = 'normal',
  className,
  onClick,
}: PageButtonProps) {
  return (
    <li>
      <button
        onClick={() => {
          if (state === 'normal' && onClick) onClick();
        }}
        className={`${className} 
        ${
          state === 'active' &&
          'z-10 flex items-center justify-center px-3 h-8 leading-tight text-blue-600 border border-blue-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700'
        }
        ${
          state === 'disabled' &&
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-300 bg-white border border-gray-300 cursor-default'
        }
        ${
          state === 'normal' &&
          'flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700'
        }
        `}
      >
        {children}
      </button>
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
  const pageButtons = [];
  const min = Math.max(1, currentPage - 2);

  for (let i = min; i <= min + 4; i++) {
    let state: 'normal' | 'active' | 'disabled' = 'normal';
    if (i === currentPage) state = 'active';
    if (i > totalPage) state = 'disabled';
    pageButtons.push(
      <PageButton
        key={i}
        state={state}
        onClick={() => handlePageClick(i)}
      >
        {i}
      </PageButton>
    );
  }

  return (
    <nav aria-label="Page navigation example">
      <ul className="flex items-center h-8 -space-x-px text-sm">
        <PageButton
          className="ml-0 rounded-l-lg"
          state={currentPage === 1 ? 'disabled' : 'normal'}
          onClick={handlePrevClick}
        >
          <span className="sr-only">Previous</span>
          <LeftArrowSvg />
        </PageButton>
        {pageButtons}
        <PageButton
          className="rounded-r-lg"
          state={totalPage <= currentPage ? 'disabled' : 'normal'}
          onClick={handleNextClick}
        >
          <span className="sr-only">Next</span>
          <RightArrowSvg />
        </PageButton>
      </ul>
    </nav>
  );
}
