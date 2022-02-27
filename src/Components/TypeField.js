import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { ExpandMore, Send } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";

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
