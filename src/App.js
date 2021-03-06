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
  remove,
  update,
  onValue,
  onChildAdded,
} from "firebase/database";
import NameDialog from "./Components/NameDialog";
import DeleteDialog from "./Components/DeleteDialog";
import sound from "./audio_files/Tick_Sound.mp3";
import ContactsLoading from "./Components/ContactsLoading";

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

  const [listOfIds, setListOfIds] = useState([]);
  const [change, setChange] = useState(0);
  const [chatsLoading, setChatsLoading] = useState(false);
  const [contactsLoading, setContactsLoading] = useState(false);
  const [itemData, setItemData] = useState([
    {
      img: "https://firebasestorage.googleapis.com/v0/b/my-react-chat-app-2d9ca.appspot.com/o/images%2Fcnn.png?alt=media&token=005e6608-665e-408a-84c1-4058f4343bdd",
      title: "Confusion Matrix",
      author: "Mayank",
    },
  ]);

  const audio = new Audio(sound);

  const updateHeight = () => {
    const element = document.getElementById("chat");
    if (element) element.scrollTop = element.scrollHeight;
  };

  useEffect(() => {
    updateHeight();
  }, [yourName]);

  const getTime = () => {
    let hrs = new Date().getHours();
    let min = new Date().getMinutes();
    if (hrs < 10) hrs = "0" + hrs;
    if (min < 10) min = "0" + min;
    return hrs + ":" + min;
  };

  const updateTheChats = (id) => {
    setChats((chats) =>
      chats.map((item) => (item.id === id ? { ...item, sent: true } : item))
    );
  };

  const sendMessage = () => {
    // THIS STATEMENT IS VERY IMPORTATNT AS IT TAKE
    // THE FOCUS BACK TO THE INPUT ELEMENT WHENEVER
    // THE USER CLICK ON THE BUTTON TO SEND THE MESSAGE.
    document.getElementById("myInput").focus();

    const id = push(ref(db, "chats")).key;
    const time = getTime();
    const newData = {
      name,
      sentTo: yourName,
      message: message,
      timing: time,
      id,
      sent: false,
    };
    set(ref(db, "chats/" + id), newData);
    setTimeout(() => {
      updateHeight();
    }, 100);
    setMessage("");
    console.log("Successfully sent!");
    setTimeout(() => {
      const updates = {};
      updates["chats/" + id] = {
        name,
        sentTo: yourName,
        message: message,
        timing: time,
        id,
        sent: true,
      };
      update(ref(db), updates);
      updateTheChats(id, time);
      audio.play();
    }, 400);
    console.log("Successfully update!");
  };

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const updateChats = (ids) => {
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
    if (!listOfIds) return;
    listOfIds.forEach((id) => {
      remove(ref(db, "chats/" + id));
    });
    setChats(updateChats(listOfIds));
    console.log("Successfully Deleted!");
    setOpenDelete(false);
    setChange(0);
    setListOfIds([]);
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
    const nameRef = push(ref(db, "names"));
    set(nameRef, { enteredName, whoIsEntering: name });
    setEnteredName("");
    setNameList((nameList) => [
      ...nameList,
      { enteredName, whoIsEntering: name },
    ]);
    setOpen(false);
  };

  useEffect(() => {
    onChildAdded(ref(db, "chats"), (data) => {
      setChats((chats) => [...chats, data.val()]);
      setTimeout(() => {
        updateHeight();
      }, 100);
    });
    onChildAdded(ref(db, "names"), (data) => {
      setNameList((nameList) => [...nameList, data.val()]);
    });
  }, []);

  const contactList = nameList
    .filter((val) => val.whoIsEntering === name)
    .map((val) => val.enteredName);

  const handleName = (name) => {
    setYourName(name);
  };

  const updateChange = (task) => {
    if (task === "backToZero") {
      setChange(0);
      return;
    }
    task === "increase" ? setChange(change + 1) : setChange(change - 1);
  };

  const updateListOfIds = (id, task) => {
    if (task === "removeAll") {
      setListOfIds([]);
      return;
    }
    task === "add"
      ? setListOfIds([...listOfIds, id])
      : setListOfIds(listOfIds.filter((currentId) => currentId !== id));
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
              itemData={itemData}
            />
            <ContactsLoading contactsLoading={contactsLoading} />
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
            change={change}
            listOfIds={listOfIds}
            updateChange={updateChange}
            updateListOfIds={updateListOfIds}
            updateHeight={updateHeight}
            setChats={setChats}
            chatsLoading={chatsLoading}
            updateChats={updateChats}
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
