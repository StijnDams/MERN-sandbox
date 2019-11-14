import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import "./Chat.scss";
import ChatMessage from "./ChatMessage";

const io = require("socket.io-client");
const socket = io("http://localhost:3000");

const Chat = () => {
  const user = useSelector(state => state.user).user;

  const [messageField, setMessageField] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (user) {
      socket.emit("message", {
        type: "join",
        from: user.username,
        message: "joined."
      });
    }

    return () => {
      if (user) {
        socket.emit("message", {
          type: "leave",
          from: user.username,
          message: "left."
        });
      }
    };
  }, [user]);

  useEffect(() => {
    socket.on("message", message => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  function handleChange(e) {
    const { value } = e.target;
    setMessageField(value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    socket.emit("message", {
      type: "message",
      from: user.username,
      message: messageField
    });
    setMessageField("");
  }

  return user ? (
    <div className="chatroom-container">
      <div className="chatroom-user">
        <h2 className="user">{user.username}</h2>
      </div>

      <div className="chatroom-explore">
        <h2 className="general">General</h2>
      </div>

      <div className="chatroom-name">General chatroom</div>
      <div className="chatroom-content">
        <div className="chatroom-messages">
          {messages.map(message => {
            return <ChatMessage message={message} />;
          })}
        </div>
        <form className="chatbar" onSubmit={handleSubmit}>
          <input type="text" onChange={handleChange} value={messageField} />
          <button>send</button>
        </form>
      </div>
    </div>
  ) : null;
};

export default Chat;
