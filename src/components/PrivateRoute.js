import React, { useEffect } from "react";
import { connect } from "react-redux";
import { STATE_LOGGED_IN } from "../reducers/auth";
import { Redirect, Route } from "react-router-dom";
import { loginPreviousUrl } from "../actions";

const CustomRoute = ({ state, noPreviousUrl, path, children, changeUrl }) => {
  useEffect(() => {
    if (!noPreviousUrl) {
      changeUrl(path);
    }
  }, [path]);

  return (
    <React.Fragment>
      {state !== STATE_LOGGED_IN ? <Redirect to="/login" /> : children}
    </React.Fragment>
  );
};

const PrivateRoute = ({ state, noPreviousUrl, path, children, changeUrl }) => (
  <Route path={path}>
    <CustomRoute
      state={state}
      path={path}
      changeUrl={changeUrl}
      noPreviousUrl={noPreviousUrl}
    >
      {children}
    </CustomRoute>
  </Route>
);

const mapState = state => ({
  state: state.auth.state
});

const mapDispatch = dispatch => ({
  changeUrl: url => dispatch(loginPreviousUrl(url))
});

export default connect(mapState, mapDispatch)(PrivateRoute);
