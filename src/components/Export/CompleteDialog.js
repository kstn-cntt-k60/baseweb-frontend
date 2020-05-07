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
import { COMPLETED_ORDER } from "../../actions/export";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const CompleteDialog = ({ open, orderId, onClose, completeOrder }) => {
  const classes = useStyles();

  const onYes = () => {
    completeOrder(orderId);
    onClose();
  };

  const title = "Do you want to complete this Order Item?";

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
          Complete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  completeOrder: id =>
    dispatch(
      apiPost("/api/export/complete-sales-order", { id }, COMPLETED_ORDER)
    )
});

export default connect(mapState, mapDispatch)(CompleteDialog);
