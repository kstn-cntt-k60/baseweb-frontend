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
import { DELETED_WAREHOUSE } from "../../actions/facility";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteWarehouseDialog = ({
  open,
  warehouseId,
  onClose,
  deleteWarehouse
}) => {
  const classes = useStyles();

  const onYes = () => {
    deleteWarehouse(warehouseId);
    onClose();
  };

  const title = "Do you want to delete this warehouse?";

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
  deleteWarehouse: id =>
    dispatch(
      apiPost("/api/facility/delete-warehouse", { id }, DELETED_WAREHOUSE)
    )
});

export default connect(mapState, mapDispatch)(DeleteWarehouseDialog);
