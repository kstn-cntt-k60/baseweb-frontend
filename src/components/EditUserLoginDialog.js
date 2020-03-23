import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Button,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

import {
  closeEditUserLoginDialog,
  updateUserLoginAction
} from "../actions/account";
import { STATE_LOADING, STATE_FAILED } from "../reducers/account";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
}));

const EditUserLoginDialog = ({
  open,
  state,
  userLogin,
  closeDialog,
  updateUserLogin
}) => {
  const classes = useStyles();

  const [username, setUsername] = useState(userLogin.username);
  const [enableResetPassword, setEnableResetPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const resetValues = () => {
    setUsername(userLogin.username);
    setEnableResetPassword(false);
    setPassword("");
    setPasswordConfirm("");
  };

  useEffect(() => {
    resetValues();
  }, [userLogin.id]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateUserLogin({
      id: userLogin.id,
      username,
      password
    });
  };

  const onResetPassword = () => {
    setEnableResetPassword(true);
  };

  const disabled =
    username === userLogin.username && enableResetPassword === false;

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Edit User Login</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
          </FormControl>
          {enableResetPassword ? (
            <React.Fragment>
              <FormControl className={classes.textField}>
                <TextField
                  margin="dense"
                  label="New Password"
                  type="text"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  fullWidth
                />
              </FormControl>
              <FormControl className={classes.textField}>
                <TextField
                  margin="dense"
                  label="Password Confirmation"
                  type="text"
                  value={passwordConfirm}
                  error={password !== passwordConfirm}
                  helperText={
                    password !== passwordConfirm ? "Password not match!" : ""
                  }
                  onChange={e => setPasswordConfirm(e.target.value)}
                  fullWidth
                />
              </FormControl>
            </React.Fragment>
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={onResetPassword}
              className={classes.textField}
            >
              Reset password
            </Button>
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {state === STATE_LOADING ? <CircularProgress /> : ""}
        {state === STATE_FAILED ? "Save failed" : ""}
        <Button
          disabled={disabled}
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={onSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = createSelector(
  state => state.account.openEditUserLoginDialog,
  state => state.account.editUserLoginState,
  state => state.account.userLoginMap,
  state => state.account.editUserLoginId,
  (open, state, userLoginMap, id) => ({
    open,
    state,
    userLogin: userLoginMap[id] || {
      id: null,
      username: ""
    }
  })
);

const mapDispatch = dispatch => ({
  closeDialog: () => dispatch(closeEditUserLoginDialog()),
  updateUserLogin: body => dispatch(updateUserLoginAction(body))
});

export default connect(mapState, mapDispatch)(EditUserLoginDialog);
