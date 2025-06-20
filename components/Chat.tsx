'use client';

import { useChat } from 'ai/react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card } from './ui/card';
import { useEffect, useRef } from 'react';
import { Message } from './Message';

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
      <div className="flex flex-col gap-4 overflow-y-auto pr-2" style={{ maxHeight: '70vh' }}>
        {messages.map((m) => (
          <Message key={m.id} role={m.role as 'user' | 'assistant'}>{m.content}</Message>
        ))}
        <div ref={endRef} />
      </div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Textarea
          value={input}
          onChange={handleInputChange}
          placeholder="Ask me anything..."
          className="flex-1 resize-none"
          rows={2}
        />
        <Button type="submit" className="self-end">
          Send
        </Button>
      </form>
    </Card>
  );
}
