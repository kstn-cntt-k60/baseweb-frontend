import React from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogContent,
  DialogActions,
  Button,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../../actions";
import { CANCELED_SALES_ORDER } from "../../../actions/order";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const CancelDialog = ({ open, orderId, onClose, cancelOrder }) => {
  const classes = useStyles();

  const onYes = () => {
    cancelOrder(parseInt(orderId));
    onClose();
  };

  const title = "Do you want to accept cancel Sales Order?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="primary">
          Close
        </Button>
        <Button onClick={onYes} variant="contained" color="secondary">
          Cancel Order
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  cancelOrder: id =>
    dispatch(
      apiPost("/api/order/cancel-sales-order", { id }, CANCELED_SALES_ORDER)
    )
});

export default connect(mapState, mapDispatch)(CancelDialog);
