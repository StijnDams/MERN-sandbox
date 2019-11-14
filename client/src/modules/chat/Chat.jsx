import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

import "./Chat.scss";

const Chat = () => {
  const user = useSelector(state => state.user).user;

  const [time, setTime] = useState();

  useEffect(() => {
    const socket = io.connect("http://localhost:3000");
    socket.emit("message", "hallo");
  }, []);

  return (
    user && (
      <div className="chatroom-container">
        <div className="chatroom-user">
          <h1 className="user">{user.username}</h1>
        </div>

        <div className="chatroom-explore">
          <h2 className="general">General</h2>
          <h2>Private</h2>
        </div>

        <div className="chatroom-name"></div>
        <div className="chatroom-content">
          <form className="chatbar">
            <input type="text" />
            <button>send</button>
          </form>
        </div>
      </div>
    )
  );
};

export default Chat;
