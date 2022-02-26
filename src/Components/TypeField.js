import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { Attachment, Send } from "@material-ui/icons";
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
}) {
  const classes = useStyles();
  const [image, setImage] = useState({ selectedFile: null });

  const handleClick = (e) => {
    e.preventDefault();
    sendMessage();
  };

  useEffect(() => {
    console.log(image);
  }, [image]);

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
        />
      </Paper>
      <div
        style={{
          position: "absolute",
          marginLeft: "63vw",
          marginTop: "2.5vh",
          color: "#80909A",
        }}
      >
        <label htmlFor="file-input">
          <Attachment style={{ cursor: "pointer" }} />
        </label>
        <input
          id="file-input"
          type="file"
          // value={image}
          style={{ display: "none" }}
          // onClick={(e) => setImage({ selectedFile: e.target.value })}
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
