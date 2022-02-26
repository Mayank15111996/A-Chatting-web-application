import "./App.css";
import React, { useEffect, useState } from "react";
import UserName from "./Components/UserName";
import Chatting from "./Components/Chatting";
import FrontPage from "./Components/FrontPage";
import {
  getDatabase,
  ref,
  push,
  set,
  onChildAdded,
  remove,
} from "firebase/database";
import NameDialog from "./Components/NameDialog";
import DeleteDialog from "./Components/DeleteDialog";
import sound from "./audio_files/Tick_Sound.mp3";

const App = () => {
  const db = getDatabase();
  const [name, setName] = useState("");
  const [chats, setChats] = useState([]);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [nameList, setNameList] = useState([]);
  const [yourName, setYourName] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteId, setDeleteId] = useState([]);

  const audio = new Audio(sound);

  const nameListRef = ref(db, "names");

  const updateHeight = () => {
    const element = document.getElementById("chat");
    if (element) element.scrollTop = element.scrollHeight;
  };

  const getTime = () => {
    let hrs = new Date().getHours();
    let min = new Date().getMinutes();
    if (hrs < 10) hrs = "0" + hrs;
    if (min < 10) min = "0" + min;
    return hrs + ":" + min;
  };

  const getUniqueId = () => {
    return (
      new Date().getFullYear() +
      ":" +
      new Date().getMonth() +
      ":" +
      new Date().getDate() +
      ":" +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds()
    );
  };

  const sendMessage = () => {
    const id = getUniqueId();
    const chatListRef = ref(db, "chats/" + id);
    set(chatListRef, {
      name,
      sentTo: yourName,
      message: message,
      timing: getTime(),
      id,
    });
    setMessage("");
    console.log("Successfully sent!");
    audio.play();
  };

  const handleDeleteOpen = (listOfIds) => {
    setOpenDelete(true);
    setDeleteId(listOfIds);
  };

  const updateChats = (ids, chats) => {
    let answer = [];
    for (let i = 0; i < chats.length; i++) {
      let found = false;
      for (let j = 0; j < ids.length; j++) {
        if (chats[i].id === ids[j]) {
          found = true;
          break;
        }
      }
      if (!found) {
        answer.push(chats[i]);
      }
    }
    return answer;
  };

  const handleDelete = () => {
    if (!deleteId) return;
    deleteId.forEach((id) => {
      remove(ref(db, "chats/" + id));
    });
    setChats(updateChats(deleteId, chats));
    console.log("Successfully Deleted!");
    setDeleteId([]);
    setOpenDelete(false);
  };

  const closeDelete = () => {
    setOpenDelete(false);
  };

  const handleAdd = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddName = () => {
    const nameRef = push(nameListRef);
    set(nameRef, { enteredName, whoIsEntering: name });
    setEnteredName("");
    setOpen(false);
  };

  useEffect(() => {
    onChildAdded(ref(db, "chats"), (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
    onChildAdded(nameListRef, (data) => {
      setNameList((nameList) => [...nameList, data.val()]);
    });
    console.log("Successfully added!");
  }, []);

  const contactList = nameList
    .filter((val) => val.whoIsEntering === name)
    .map((val) => val.enteredName);

  const handleName = (name) => {
    setYourName(name);
  };

  return (
    <div className="body">
      {!yourName ? (
        !name ? (
          <div className="upper-type-field">
            <UserName setName={setName} setYourName={setYourName} />
          </div>
        ) : (
          <>
            <FrontPage
              AppName={name}
              contactList={contactList}
              handleName={handleName}
              handleAdd={handleAdd}
            />
            {open && (
              <NameDialog
                open={open}
                handleAddName={handleAddName}
                enteredName={enteredName}
                handleClose={handleClose}
                handleChange={(e) => setEnteredName(e.target.value)}
              />
            )}
          </>
        )
      ) : (
        <>
          <Chatting
            name={name}
            chats={chats}
            setChats={setChats}
            setName={setName}
            yourName={yourName}
            setYourName={setYourName}
            sendMessage={sendMessage}
            message={message}
            setMessage={setMessage}
            handleDeleteOpen={handleDeleteOpen}
          />
          {openDelete && (
            <DeleteDialog
              openDelete={openDelete}
              handleDelete={handleDelete}
              handleClose={closeDelete}
            />
          )}
        </>
      )}
    </div>
  );
};

export default App;
