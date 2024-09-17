import React, { useState, useCallback } from 'react';
import { FaThumbsUp, FaTrashAlt } from 'react-icons/fa';

const Message = React.memo(({ message, onLike, onDelete }) => {
  console.log("Rendering message:", message);
  return (
    <div>
      <p>{message.text}</p>
      <button onClick={() => onLike(message.id)}>
        <FaThumbsUp /> Like {message.likes}
      </button>
      <button onClick={() => onDelete(message.id)}>
        <FaTrashAlt /> Delete
      </button>
    </div>
  );
});

function ChatApp() {
  const msgs = [
    { id: 1, text: "Hello there!", likes: 0 },
    { id: 2, text: "How are you?", likes: 0 },
    { id: 3, text: "What's up?", likes: 0 },
    { id: 4, text: "Good morning!", likes: 0 },
    { id: 5, text: "Good night!", likes: 0 },
    { id: 6, text: "Have a great day!", likes: 0 },
    { id: 7, text: "How was your weekend?", likes: 0 },
    { id: 8, text: "Long time no see!", likes: 0 },
    { id: 9, text: "What are you up to?", likes: 0 },
    { id: 10, text: "Let's catch up soon!", likes: 0 },
    { id: 11, text: "Congrats on your achievement!", likes: 0 },
    { id: 12, text: "Happy to see you!", likes: 0 },
    { id: 13, text: "Hope you're doing well.", likes: 0 },
    { id: 14, text: "Cheers to the weekend!", likes: 0 },
    { id: 15, text: "How's your project going?", likes: 0 },
    { id: 16, text: "Let's grab coffee sometime.", likes: 0 },
    { id: 17, text: "Wishing you success!", likes: 0 },
    { id: 18, text: "What’s the latest news?", likes: 0 },
    { id: 19, text: "Thinking of you!", likes: 0 },
    { id: 20, text: "Take care and stay safe!", likes: 0 }
];

  const [messages, setMessages] = useState(msgs);

  // useCallback memoizes the onLike function
  const handleLike = useCallback((id) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, likes: msg.likes + 1 } : msg
      )
    );
  }, [setMessages]);

  // useCallback memoizes the onDelete function
  const handleDelete = useCallback((id) => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => msg.id !== id)
    );
  }, [setMessages]);

  return (
    <div>
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
          onLike={handleLike}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default ChatApp;
