import { ButtonHTMLAttributes } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

}
export default function BlueButton(props :Props) {
  return (
    <button
      type="button"
      {...props}
      className="flex items-center justify-center w-8 h-8 text-blue-600 border-2 border-blue-300 rounded-xl hover:bg-blue-100"
    >
      {props.children}
    </button>
  );
}
