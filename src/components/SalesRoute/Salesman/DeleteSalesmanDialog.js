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
import { DELETED_SALESMAN } from "../../../actions/salesman";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteSalesmanDialog = ({
  open,
  salesmanId,
  onClose,
  deleteSalesman
}) => {
  const classes = useStyles();

  const onYes = () => {
    deleteSalesman(salesmanId);
    onClose();
  };

  const title = "Do you want to delete this salesman?";

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
  deleteSalesman: id =>
    dispatch(
      apiPost("/api/sales-route/delete-salesman", { id }, DELETED_SALESMAN)
    )
});

export default connect(mapState, mapDispatch)(DeleteSalesmanDialog);
