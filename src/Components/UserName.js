import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5px 20px",
    display: "flex",
    alignItems: "center",
    width: 250,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function CustomizedInputBase({ setName }) {
  const classes = useStyles();
  const [user1, setUser1] = useState("");

  const handleConfirm = () => {
    setName(user1);
  };

  const handleSetConfirm = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setName(user1);
    }
  };

  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Type your name"
        inputProps={{ "aria-label": "search google maps" }}
        value={user1}
        name="myName"
        onInput={(e) => setUser1(e.target.value)}
        onKeyDown={handleSetConfirm}
        autoFocus
      />
      <Divider className={classes.divider} orientation="vertical" />
      <Button variant="contained" color="primary" onClick={handleConfirm}>
        Confirm
      </Button>
    </Paper>
  );
}
