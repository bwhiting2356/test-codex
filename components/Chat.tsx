'use client';

import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { useEffect, useRef } from 'react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat'
  });

  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Card className="flex flex-col gap-4 max-w-2xl mx-auto p-4">
      <div className="flex flex-col gap-3 max-h-[70vh] overflow-auto">
        {messages.map(m => (
          <div
            key={m.id}
            className={`whitespace-pre-wrap p-3 rounded-md max-w-sm ${
              m.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-100 dark:bg-gray-700'
            }`}
          >
            {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1"
        />
        <Button type="submit">Send</Button>
      </form>
    </Card>
  );
}
