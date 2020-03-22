import React from "react";
import { connect } from "react-redux";

import { Button } from "@material-ui/core";
import { openAddUserLoginDialog } from "../../actions/account";
import UserLoginTable from "./UserLoginTable";

const UserLogin = ({ openDialog }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add User Login
      </Button>
      <UserLoginTable />
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  openDialog: () => dispatch(openAddUserLoginDialog())
});

export default connect(mapState, mapDispatch)(UserLogin);
