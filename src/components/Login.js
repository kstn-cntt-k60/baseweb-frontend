import React, { useState } from "react";
import {
  makeStyles,
  Container,
  CssBaseline,
  Avatar,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Paper
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";
import { loginAction } from "../actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  STATE_FAILED,
  STATE_IN_PROGRESS,
  STATE_LOGGED_IN
} from "../reducers/auth";

const useStyles = makeStyles(theme => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.secondary.main
  },
  submit: {
    margin: theme.spacing(3, 0)
  },
  wrap: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: 400,
    padding: "0 20px"
  },
  container: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    width: "100vw",
    height: "100vh"
  }
}));

const Login = ({ state, onLogin }) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    onLogin(username, password);
  };

  return (
    <div className={classes.container}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Paper className={classes.wrap}>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlined />
            </Avatar>
            <Typography variant="h5">Login</Typography>
            {state === STATE_FAILED ? (
              <h4>Account or Password not correct</h4>
            ) : (
              ""
            )}
            <form onSubmit={onSubmit}>
              <TextField
                variant="outlined"
                margin="normal"
                label="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                type="text"
                autoComplete="off"
                fullWidth
              />
              <TextField
                margin="normal"
                variant="outlined"
                label="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                type="password"
                fullWidth
              />
              <Button
                variant="contained"
                color="primary"
                type="submit"
                fullWidth
                className={classes.submit}
              >
                Sign In
              </Button>
              {state === STATE_IN_PROGRESS ? <CircularProgress /> : ""}
            </form>
          </div>
        </Paper>
      </Container>
    </div>
  );
};

const RedirectLogin = ({ state, onLogin, previousUrl }) => (
  <React.Fragment>
    {state === STATE_LOGGED_IN ? (
      <Redirect to={previousUrl} />
    ) : (
      <Login state={state} onLogin={onLogin} />
    )}
  </React.Fragment>
);

const mapState = state => ({
  state: state.auth.state,
  previousUrl: state.auth.previousUrl
});

const mapDispatch = dispatch => ({
  onLogin: (username, password) => dispatch(loginAction(username, password))
});

export default connect(mapState, mapDispatch)(RedirectLogin);
