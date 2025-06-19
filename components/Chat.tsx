'use client';

import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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
    <div className="flex flex-col gap-4 max-w-xl mx-auto p-4">
      <div className="flex flex-col gap-2 max-h-80 overflow-auto">
        {messages.map(m => (
          <div key={m.id} className="whitespace-pre-wrap">
            <strong>{m.role}:</strong> {m.content}
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input value={input} onChange={handleInputChange} placeholder="Say something" />
        <Button type="submit">Send</Button>
      </form>
    </div>
  );
}
