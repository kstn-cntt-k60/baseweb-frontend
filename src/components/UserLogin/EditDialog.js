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
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_USER_LOGIN } from "../../actions/account";

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

const EditDialog = ({
  open,
  userLoginId,
  getUserLogin,
  onClose,
  updateUserLogin
}) => {
  const classes = useStyles();

  const userLogin = getUserLogin(userLoginId);

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
  }, [userLoginId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateUserLogin({
      id: userLogin.id,
      username,
      password
    });
    onClose();
  };

  const onResetPassword = () => {
    setEnableResetPassword(true);
  };

  const disabled =
    username === userLogin.username && enableResetPassword === false;

  return (
    <Dialog open={open} onClose={onClose}>
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
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  fullWidth
                />
              </FormControl>
              <FormControl className={classes.textField}>
                <TextField
                  margin="dense"
                  label="Password Confirmation"
                  type="password"
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
  state => state.account.userLoginMap,
  userLoginMap => ({
    getUserLogin: id =>
      userLoginMap[id] || {
        id: null,
        username: ""
      }
  })
);

const mapDispatch = dispatch => ({
  updateUserLogin: body =>
    dispatch(
      apiPost("/api/account/update-user-login", body, UPDATED_USER_LOGIN)
    )
});

export default connect(mapState, mapDispatch)(EditDialog);
