import Link from 'next/link';
import { ReactNode } from 'react';

type Props = {
  drawer: boolean;
  children: ReactNode;
};

export default function Drawer({ drawer, children }: Props) {
  return (
    <div className={`z-20 w-full h-full absolute flex pointer-events-none`}>
      <div
        className={`${
          !drawer && '-translate-x-full'
        } w-80 bg-white bg-opacity-95 transform transition-transform duration-300 ease-in-out z-20 lg:translate-x-0 pointer-events-auto`}
      >
        {children}
      </div>
      <Link
        href="?drawer=false"
        className={`absolute w-full h-full bg-black grow opacity-30 lg:hidden pointer-events-auto ${!drawer && 'hidden'}`}
      ></Link>
    </div>
  );
}
