import React from "react";
import { connect } from "react-redux";

import { openAddPartyDialog } from "../../actions";
import { Button, Divider } from "@material-ui/core";
import PersonTable from "./PersonTable";

const Party = ({ openDialog }) => {
  return (
    <div>
      <Button variant="contained" color="primary" onClick={openDialog}>
        Add Party
      </Button>
      <Divider />
      <PersonTable />
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  openDialog: () => dispatch(openAddPartyDialog())
});

export default connect(mapState, mapDispatch)(Party);
