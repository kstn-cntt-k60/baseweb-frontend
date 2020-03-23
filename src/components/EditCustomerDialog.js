import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Button,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

import {
  closeEditCustomerDialog,
  updateCustomerAction
} from "../actions/account";
import { STATE_LOADING, STATE_FAILED } from "../reducers/account";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
}));

const EditCustomerDialog = ({
  open,
  state,
  customer,
  closeDialog,
  updateCustomer
}) => {
  const classes = useStyles();

  const [description, setDescription] = useState(customer.description);
  const [name, setName] = useState(customer.name);

  const resetValues = () => {
    setDescription(customer.description);
    setName(customer.name);
  };

  useEffect(() => {
    resetValues();
  }, [customer.id]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateCustomer({
      id: customer.id,
      description,
      name
    });
  };

  const disabled =
    description === customer.description && name === customer.name;

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Edit Customer</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
          </FormControl>

          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Customer's Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        {state === STATE_LOADING ? <CircularProgress /> : ""}
        {state === STATE_FAILED ? "Save failed" : ""}
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
          onClick={onSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = createSelector(
  state => state.account.openEditCustomerDialog,
  state => state.account.editCustomerState,
  state => state.account.customerMap,
  state => state.account.editCustomerId,
  (open, state, customerMap, id) => ({
    open,
    state,
    customer: customerMap[id] || {
      description: "",
      name: ""
    }
  })
);

const mapDispatch = dispatch => ({
  closeDialog: () => dispatch(closeEditCustomerDialog()),
  updateCustomer: body => dispatch(updateCustomerAction(body))
});

export default connect(mapState, mapDispatch)(EditCustomerDialog);
