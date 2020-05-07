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
import { ACCEPTED_SALES_ORDER } from "../../../actions/order";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const AcceptDialog = ({ open, orderId, onClose, acceptOrder }) => {
  const classes = useStyles();

  const onYes = () => {
    acceptOrder(parseInt(orderId));
    onClose();
  };

  const title = "Do you want to accept this Sales Order?";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogContent className={classes.dialog}>
        <h2>{title}</h2>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={onYes} variant="contained" color="primary">
          Accept
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  acceptOrder: id =>
    dispatch(
      apiPost("/api/order/accept-sales-order", { id }, ACCEPTED_SALES_ORDER)
    )
});

export default connect(mapState, mapDispatch)(AcceptDialog);
