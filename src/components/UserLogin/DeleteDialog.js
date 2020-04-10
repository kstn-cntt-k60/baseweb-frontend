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
import { DELETED_USER_LOGIN } from "../../actions/account";

const useStyles = makeStyles(() => ({
  dialog: {
    width: "500px"
  }
}));

const DeleteDialog = ({ open, userLoginId, onClose, deleteUserLogin }) => {
  const classes = useStyles();

  const handleYes = () => {
    deleteUserLogin(userLoginId);
    onClose();
  };

  const title = "Do you want to delete this login account?";

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
  deleteUserLogin: id =>
    dispatch(
      apiPost("/api/account/delete-user-login", { id }, DELETED_USER_LOGIN)
    )
});

export default connect(mapState, mapDispatch)(DeleteDialog);
