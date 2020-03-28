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
import { DELETED_PRODUCT } from "../../actions/product";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteDialog = ({ open, productId, onClose, deleteProduct }) => {
  const classes = useStyles();

  const onYes = () => {
    deleteProduct(productId);
    onClose();
  };

  const title = "Do you want to delete this product?";

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
  deleteProduct: id =>
    dispatch(apiPost("/api/product/delete-product", { id }, DELETED_PRODUCT))
});

export default connect(mapState, mapDispatch)(DeleteDialog);
