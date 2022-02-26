import React, { useState } from "react";
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
  handleDeleteOpen,
}) => {
  const [listOfIds, setListOfIds] = useState([]);
  const [change, setChange] = useState(0);

  const handleClick = (id) => {
    if (document.getElementById(id).classList.contains("selected")) {
      setListOfIds(listOfIds.filter((currentId) => currentId !== id));
      setChange(change - 1);
      console.log(change);
      document.getElementById(id).classList.remove("selected");
    } else {
      setListOfIds([...listOfIds, id]);
      setChange(change + 1);
      console.log(change);
      document.getElementById(id).classList.add("selected");
    }
  };

  const handleClick2 = () => {
    setChange(change - listOfIds.length);
    handleDeleteOpen(listOfIds);
  };

  return (
    <>
      <NavBar
        yourName={yourName}
        setYourName={setYourName}
        change={change}
        handleDeleteOpen={() => handleClick2()}
      />
      <div id="chat" className="chat-container">
        {chats
          .filter(
            (chat) =>
              (chat.name === name && chat.sentTo === yourName) ||
              (chat.name === yourName && chat.sentTo === name)
          )
          .map((chat) => {
            return (
              <div
                key={chat.id}
                className={`container ${chat.name === name ? "me" : "you"}`}
                id={chat.id}
                onClick={() => handleClick(chat.id)}
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
