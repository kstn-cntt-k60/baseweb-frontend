import React from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
import { openAddUserLoginDialog } from "../../actions/account";

const UserLogin = ({ openDialog }) => {
  return (
    <div>
      <h2>User Login</h2>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add User Login
      </Button>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  openDialog: () => dispatch(openAddUserLoginDialog())
});

export default connect(mapState, mapDispatch)(UserLogin);
