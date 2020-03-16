import React from "react";
import { connect } from "react-redux";
import { openAddPartyDialog } from "../actions";

const Party = ({ openDialog }) => {
  return (
    <div>
      Hello
      <button onClick={openDialog}>Open</button>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  openDialog: () => dispatch(openAddPartyDialog())
});

export default connect(mapState, mapDispatch)(Party);
