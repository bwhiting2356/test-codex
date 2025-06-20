import { ReactNode } from 'react';

interface MessageProps {
  role: 'user' | 'assistant';
  children: ReactNode;
}

export function Message({ role, children }: MessageProps) {
  const isUser = role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : ''}`}>
      <div
        className={`whitespace-pre-wrap rounded-lg px-4 py-2 text-sm max-w-prose ${
          isUser ? 'bg-blue-600 text-white' : 'bg-gray-100 dark:bg-gray-700'
        }`}
      >
        {children}
      </div>
    </div>
  );
}
