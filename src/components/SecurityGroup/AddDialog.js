import React, { useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  makeStyles
} from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

import { apiPost } from "../../actions";
import { ADDED_SECURITY_GROUP } from "../../actions/security";

const AddDialog = ({ open, onClose, addGroup }) => {
  const classes = useStyles();
  const [name, setName] = useState("");

  const onCancel = () => {
    setName("");
  };

  const onAdd = () => {
    addGroup(name);
    onClose();
  };

  const disabled = name === "";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.dialog}>Add Security Group</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Security Group Name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button
          disabled={disabled}
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={onAdd}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  addGroup: name =>
    dispatch(
      apiPost(
        "/api/security/add-security-group",
        { name },
        ADDED_SECURITY_GROUP
      )
    )
});

export default connect(mapState, mapDispatch)(AddDialog);
