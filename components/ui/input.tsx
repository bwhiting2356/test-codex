import { InputHTMLAttributes } from 'react';

export function Input({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={`border rounded px-2 py-1 flex-1 ${className}`}
      {...props}
    />
  );
}
