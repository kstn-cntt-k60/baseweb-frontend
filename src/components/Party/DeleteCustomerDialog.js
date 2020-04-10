import React from "react";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";
import { connect } from "react-redux";

import { apiPost } from "../../actions";
import { DELETED_CUSTOMER } from "../../actions/account";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteCustomerDialog = ({
  open,
  customerId,
  onClose,
  deleteCustomer
}) => {
  const classes = useStyles();

  const handleYes = () => {
    deleteCustomer(customerId);
    onClose();
  };

  const title = "Do you want to delete this customer?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
        <Button onClick={handleYes} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  deleteCustomer: id =>
    dispatch(apiPost("/api/account/delete-customer", { id }, DELETED_CUSTOMER))
});

export default connect(mapState, mapDispatch)(DeleteCustomerDialog);
