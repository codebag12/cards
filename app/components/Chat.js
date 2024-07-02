// app/components/Chat.js
'use client';
import { useState } from 'react';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (input.trim() === '') return;

    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: input }),
    });

    const data = await response.json();
    setMessages([...messages, { text: input, from: 'user' }, { text: data.response, from: 'bot' }]);
    setInput('');
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index} style={{ textAlign: msg.from === 'user' ? 'right' : 'left' }}>
            {msg.text}
          </p>
        ))}
      </div >
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type a message..."
        style={{ color: 'black' }}
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
};

export default Chat;
