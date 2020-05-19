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
import { DELETED_CONFIG } from "../../actions/salesroute";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteConfigDialog = ({ open, configId, onClose, deleteConfig }) => {
  const classes = useStyles();

  const onYes = () => {
    deleteConfig(configId);
    onClose();
  };

  const title = "Do you want to delete this config?";

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
  deleteConfig: id =>
    dispatch(
      apiPost(
        "/api/sales-route/delete-salesroute-config",
        { id },
        DELETED_CONFIG
      )
    )
});

export default connect(mapState, mapDispatch)(DeleteConfigDialog);
