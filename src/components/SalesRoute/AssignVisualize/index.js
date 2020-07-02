import React from "react";
import { connect } from "react-redux";
import GoogleMapVisualize from "./GoogleMapVisualize";
import SalesmanTable from "./SalesmanTable";
import { apiGet } from "../../../actions";
import {
  FIND_STORE_OF_SALESMAN,
  FAILED_FIND_STORE_OF_SALESMAN
} from "../../../actions/salesroute";
import { createSelector } from "reselect";

const AssignVisualize = ({ listStore, findStore }) => {
  return (
    <div>
      <GoogleMapVisualize listStore={listStore} />

      <SalesmanTable style={{ marginTop: "10px" }} onClickSelect={findStore} />
    </div>
  );
};

const mapState = createSelector(
  state => state.salesroute.storeOfSalesman,
  listStore => ({ listStore })
);

const mapDispatch = dispatch => ({
  findStore: id =>
    dispatch(
      apiGet(
        `/api/sales-route/get-store-of-salesman/${id}`,
        FIND_STORE_OF_SALESMAN,
        FAILED_FIND_STORE_OF_SALESMAN
      )
    )
});

export default connect(mapState, mapDispatch)(AssignVisualize);
