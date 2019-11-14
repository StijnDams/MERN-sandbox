import React from "react";

const ChatMessage = textMessage => {
  const { type, from, message } = textMessage.message;

  const joinMessage = <p>{`${from} ${message}`}</p>;
  const leaveMessage = <p>{`${from} ${message}`}</p>;
  const defaultMessage = <p>{`${from}: ${message}`}</p>;

  console.log(type);
  switch (type) {
    case "join":
      return joinMessage;
    case "leave":
      return leaveMessage;
    case "message":
      return defaultMessage;
    default:
      return null;
  }
};

export default ChatMessage;
