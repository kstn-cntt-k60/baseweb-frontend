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
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_CUSTOMER } from "../../actions/account";

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
  customerId,
  getCustomer,
  onClose,
  updateCustomer
}) => {
  const classes = useStyles();

  const customer = getCustomer(customerId);

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
    <Dialog open={open} onClose={onClose}>
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
  state => state.account.customerMap,
  customerMap => ({
    getCustomer: id =>
      customerMap[id] || {
        description: "",
        name: ""
      }
  })
);

const mapDispatch = dispatch => ({
  updateCustomer: body =>
    dispatch(apiPost("/api/account/update-customer", body, UPDATED_CUSTOMER))
});

export default connect(mapState, mapDispatch)(EditCustomerDialog);
