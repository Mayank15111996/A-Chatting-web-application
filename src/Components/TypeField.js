import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { Attachment, ExpandMore, Send } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    position: "relative",
  },
  root: {
    padding: "5px 20px",
    display: "flex",
    alignItems: "center",
    width: 275,
    height: 35,
    margin: theme.spacing(1),
    borderRadius: theme.spacing(4),
    backgroundColor: "#20333B",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#fff",
    // "& ::placeholder": { // ITS WORKING BUT PREVIOUS COLOR WAS BETTER
    //   color: "#80909A",
    //   fontWeight: "bold",
    // },
  },
  fabIcon: {
    paddingLeft: 3,
    height: 46,
    width: 46,
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function CustomizedInputBase({
  message,
  setMessage,
  sendMessage,
  setYourName,
  updateHeight,
}) {
  const classes = useStyles();
  const [image, setImage] = useState({ selectedFile: null });

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log(e);
      e.preventDefault();
      sendMessage();
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    sendMessage();
  };

  const handleKeyboardOpen = (e) => {
    e.preventDefault();
    document.getElementById("chat").style.height = "59vh";
    updateHeight();
    if (document.getElementById("icon").style.transform === "") {
      document.getElementById("icon").style.transform = "rotate(180deg)";
    } else {
      document.getElementById("icon").style.transform = "";
    }
  };

  const handleKeyboardClose = (e) => {
    e.stopPropagation();
    if (document.getElementById("icon").style.transform === "") {
      document.getElementById("icon").style.transform = "rotate(180deg)";
    } else {
      document.getElementById("icon").style.transform = "";
    }
    document.getElementById("chat").style.height = "76vh";
  };

  const handleBack = () => {
    setYourName("");
  };

  const handleFocus = (e) => {
    document.getElementById("icon").style.marginTop = "4vh";
    document.getElementById("attachment").style.marginTop = "3.9vh";
  };

  const handleBlur = (e) => {
    document.getElementById("icon").style.marginTop = "2.6vh";
    document.getElementById("attachment").style.marginTop = "2.5vh";
  };

  const handleFileInput = () => {
    const file = new File(
      [document.getElementById("input").files[0]],
      "cnn.png"
    );
    const storage = getStorage();
    const storageRef = ref(storage, "images");

    // 'file' comes from the Blob or File API
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  return (
    <div className={classes.container}>
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Type your message"
          inputProps={{ "aria-label": "search google maps" }}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          id="myInput"
          onKeyDown={handleKeyDown}
          onClick={(e) => handleKeyboardOpen(e)}
          onFocus={(e) => handleFocus(e)}
          autoComplete="off"
          onBlur={(e) => handleBlur(e)}
        />
      </Paper>
      <div
        style={{
          position: "absolute",
          marginLeft: "59vw",
          marginTop: "2.6vh",
          color: "#80909A",
          transform: "rotate(180deg)",
          cursor: "pointer",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        id="icon"
        onClick={(e) => handleKeyboardClose(e)}
        onDoubleClick={() => handleBack()}
      >
        <ExpandMore />
      </div>
      <div
        style={{
          position: "absolute",
          marginLeft: "70vw",
          marginTop: "2.5vh",
          color: "#80909A",
        }}
        id="attachment"
      >
        <label htmlFor="input">
          <Attachment style={{ cursor: "pointer" }} />
        </label>
        <input
          id="input"
          type="file"
          // value={image}
          style={{ display: "none" }}
          // onClick={(e) => setImage({ selectedFile: e.target.value })}
          onChange={() => handleFileInput()}
        />
      </div>
      <Fab
        color="secondary"
        aria-label="add"
        className={classes.fabIcon}
        onClick={handleClick}
      >
        <Send />
      </Fab>
    </div>
  );
}
