import React from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { DELETED_CUSTOMER_STORE } from "../../actions/facility";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteCustomerStoreDialog = ({ open, storeId, onClose, deleteStore }) => {
  const classes = useStyles();

  const onYes = () => {
    deleteStore(storeId);
    onClose();
  };

  const title = "Do you want to delete this store?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          No
        </Button>
        <Button onClick={onYes} variant="contained" color="primary">
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  deleteStore: id =>
    dispatch(
      apiPost(
        "/api/facility/delete-customer-store",
        { id },
        DELETED_CUSTOMER_STORE
      )
    )
});

export default connect(mapState, mapDispatch)(DeleteCustomerStoreDialog);
