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
import { EXPORTED_ORDER_ITEM } from "../../actions/export";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const ExportDialog = ({
  open,
  orderId,
  orderSeq,
  onClose,
  exportOrderItem
}) => {
  const classes = useStyles();

  const onYes = () => {
    exportOrderItem(orderId, orderSeq);
    onClose();
  };

  const title = "Do you want to export this Order Item?";

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
          Export
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  exportOrderItem: (saleOrderId, saleOrderSeq) =>
    dispatch(
      apiPost(
        "/api/export/export-sale-order-item",
        { saleOrderId, saleOrderSeq, effectiveFrom: new Date() },
        EXPORTED_ORDER_ITEM
      )
    )
});

export default connect(mapState, mapDispatch)(ExportDialog);
