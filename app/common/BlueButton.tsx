import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}
export default function BlueButton (props :Props) {

    return (
      <button
        {...props}
        className="w-8 h-8 border-2 rounded-xl border-blue-300 text-blue-600 flex justify-center items-center hover:bg-blue-100"
      >
        {props.children}
      </button>
    );
}