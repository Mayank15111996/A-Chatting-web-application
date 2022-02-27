import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function NameDialog({
  open,
  handleAddName,
  enteredName,
  handleChange,
  handleClose,
}) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add a new contact</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Name"
            type="email"
            fullWidth
            value={enteredName}
            onChange={handleChange}
            autoComplete="off"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleAddName} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
