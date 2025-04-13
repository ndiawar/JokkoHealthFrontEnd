import React, { useState } from "react";

const ChatWindow = ({ messages, onSendMessage, selectedChat }) => {
  const [newMessage, setNewMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="chat-window">
      <h2>Chat avec {selectedChat.members.join(", ")}</h2>
      <div className="messages">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.senderId}: </strong>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Tapez votre message..."
        />
        <button type="submit">Envoyer</button>
      </form>
    </div>
  );
};

export default ChatWindow;