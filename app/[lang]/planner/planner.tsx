'use client';

import { ClientMessage } from '@/actions/ai';
import { nanoid } from 'ai';
import { useActions, useUIState } from 'ai/rsc';
import React, { useState } from 'react';

export default function Planner() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useUIState();

  const { continueConversation } = useActions();
  
  return (
    <div>
      <div>
        {conversation.map((message: ClientMessage) => (
          <div key={message.id}>
            {message.role}: {message.display}
          </div>
        ))}
      </div>

      <form onSubmit={async (e) => {
        e.preventDefault();
        setInput('')
        setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            {id: nanoid(), role: "user", display: input}
        ])

        const message = await continueConversation(input);
        setConversation((currentConversation: ClientMessage[]) => [
            ...currentConversation,
            message
        ])
      }}>
        <input type="text" value={input} onChange={(event) => {
            setInput(event.target.value)
        }}/>

        <button type='submit'>Send message</button>
      </form>
    </div>
  );
}
