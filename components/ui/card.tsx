import { HTMLAttributes } from 'react';

export function Card({ className = '', ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`border rounded-lg shadow-sm bg-white dark:bg-gray-800 ${className}`}
      {...props}
    />
  );
}
