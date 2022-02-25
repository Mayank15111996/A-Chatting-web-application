import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    setChange(listOfIds.length);
  }, [chats]);

  const handleClick = (id) => {
    if (document.getElementById(id).classList.contains("selected")) {
      setChange(change - 1);
      setListOfIds(listOfIds.filter((currentId) => currentId !== id));
      console.log(listOfIds.length);
      document.getElementById(id).classList.remove("selected");
    } else {
      setChange(change + 1);
      console.log(listOfIds.length);
      setListOfIds([...listOfIds, id]);
      document.getElementById(id).classList.add("selected");
    }
  };

  return (
    <>
      <NavBar
        yourName={yourName}
        setYourName={setYourName}
        change={change}
        handleDeleteOpen={() => handleDeleteOpen(listOfIds)}
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
