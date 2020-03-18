import React from "react";
import { connect } from "react-redux";

import { openAddPartyDialog } from "../../actions/account";
import { Button, Divider } from "@material-ui/core";
import PersonTable from "./PersonTable";
import CustomerTable from "./CustomerTable";

const Party = ({ openDialog }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add Party
      </Button>
      <Divider />
      <PersonTable />
      <Divider />
      <CustomerTable />
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  openDialog: () => dispatch(openAddPartyDialog())
});

export default connect(mapState, mapDispatch)(Party);
