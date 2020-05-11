import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

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
import { UPDATED_CUSTOMER_STORE } from "../../actions/facility";

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

const EditCustomerStoreDialog = ({
  open,
  storeId,
  getStore,
  onClose,
  updateStore
}) => {
  const classes = useStyles();

  const store = getStore(storeId);

  const [name, setName] = useState(store.name);
  const [addr, setAddr] = useState(store.address);

  const resetValues = () => {
    setName(store.name);
    setAddr(store.address);
  };

  useEffect(() => {
    resetValues();
  }, [storeId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateStore({
      id: storeId,
      name,
      address: addr
    });
  };

  const disabled = name === store.name && addr === store.address;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Customer Store </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Store Name"
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

const emptyStore = {
  id: null,
  name: "",
  address: ""
};

const mapState = createSelector(
  state => state.facility.storeMap,
  storeMap => ({
    getStore: id => storeMap[id] || emptyStore
  })
);

const mapDispatch = dispatch => ({
  updateStore: body =>
    dispatch(
      apiPost(
        "/api/facility/update-customer-store",
        body,
        UPDATED_CUSTOMER_STORE
      )
    )
});

export default connect(mapState, mapDispatch)(EditCustomerStoreDialog);
