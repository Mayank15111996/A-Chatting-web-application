import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import { Send } from "@material-ui/icons";
import Fab from "@material-ui/core/Fab";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
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
    "::placeholder": {
      color: "red",
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
    color: "#fff",
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

  const handleClick = (e) => {
    e.preventDefault();
    sendMessage();
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
        />
      </Paper>
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
