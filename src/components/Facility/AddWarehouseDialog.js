import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { ADDED_WAREHOUSE } from "../../actions/facility";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  }
}));

const AddWarehouseDialog = ({ open, onClose, saveWarehouse }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");

  const onCancel = () => {
    setName("");
    setAddr("");
  };

  const onSave = () => {
    saveWarehouse({
      name,
      address: addr
    });
    onClose();
  };

  const disabled = name === "" || addr === "";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Warehouse</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Warehouse Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Address"
              type="text"
              value={addr}
              onChange={e => setAddr(e.target.value)}
              fullWidth
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={disabled}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  saveWarehouse: body =>
    dispatch(apiPost("/api/facility/add-warehouse", body, ADDED_WAREHOUSE))
});

export default connect(mapState, mapDispatch)(AddWarehouseDialog);
