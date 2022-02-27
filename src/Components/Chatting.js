import React, { useEffect, useState } from "react";
import TypeField from "./TypeField";

import NavBar from "./NavBar";
import { Done, Schedule } from "@material-ui/icons";
import ChatsLoading from "./ChatsLoading";

const Chatting = ({
  name,
  yourName,
  setYourName,
  chats,
  sendMessage,
  message,
  setMessage,
  handleDeleteOpen,
  change,
  listOfIds,
  updateChange,
  updateListOfIds,
  updateHeight,
  chatsLoading,
  setChats,
  updateChats,
}) => {
  const handleClick = (id) => {
    if (document.getElementById(id).classList.contains("selected")) {
      updateChange("decrease");
      updateListOfIds(id, "remove");
      console.log(change);
      document.getElementById(id).classList.remove("selected");
    } else {
      updateChange("increase");
      updateListOfIds(id, "add");
      console.log(change);
      document.getElementById(id).classList.add("selected");
    }
  };

  const handleClick2 = () => {
    handleDeleteOpen(listOfIds);
  };

  return (
    <>
      <NavBar
        yourName={yourName}
        setYourName={setYourName}
        change={change}
        handleDeleteOpen={() => handleClick2()}
        name={name}
        setChats={setChats}
        updateChats={updateChats}
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
                  <div className="timing">
                    <div className="time">{chat.timing}</div>
                    <div className="tick">
                      {chat.sent ? (
                        <Done style={{ transform: "scale(0.7)" }} />
                      ) : (
                        <Schedule style={{ transform: "scale(0.65)" }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <div className="type-field" id="myTypeField">
        <TypeField
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          style={{ backgroundColor: "red" }}
          setYourName={setYourName}
          updateHeight={updateHeight}
        />
        <ChatsLoading chatsLoading={chatsLoading} />
      </div>
    </>
  );
};

export default Chatting;
