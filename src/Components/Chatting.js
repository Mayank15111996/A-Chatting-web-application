import React from "react";
import TypeField from "./TypeField";

import NavBar from "./NavBar";

const Chatting = ({
  name,
  yourName,
  setYourName,
  chats,
  sendMessage,
  message,
  setMessage,
}) => {
  return (
    <>
      <NavBar yourName={yourName} setYourName={setYourName} />
      <div id="chat" className="chat-container">
        {chats
          .filter(
            (chat) =>
              (chat.name === name && chat.sentTo === yourName) ||
              (chat.name === yourName && chat.sentTo === name)
          )
          .map((chat, index) => {
            return (
              <div
                key={index}
                className={`container ${chat.name === name ? "me" : "you"}`}
              >
                <div
                  className={`chatbox ${chat.name === name ? "me" : "you"}`}
                  style={{ position: "relative", minWidth: "50px" }}
                >
                  <span className="message">{chat.message}</span>
                  <div className="timing">{chat.timing}</div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="type-field">
        <TypeField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          style={{ backgroundColor: "red" }}
        />
      </div>
    </>
  );
};

export default Chatting;
