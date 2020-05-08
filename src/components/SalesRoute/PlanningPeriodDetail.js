import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { formatTime, formatDate, zeroPad } from "../../util";
import { apiGet } from "../../actions";

import { makeStyles } from "@material-ui/core";

import { Paper } from "@material-ui/core";
// import ProductTable from "./ProductTable";
// import InventoryItemTable from "./InventoryItemTable";
// import AddInventoryItemDialog from "./AddInventoryItemDialog";
import { GOT_PLANNING } from "../../actions/salesroute";

const useStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const PlanningPeriodDetail = ({ getPlanning, apiGetPlanning }) => {
  const classes = useStyles();

  const { id } = useParams();
  //   const history = useHistory();

  //   const [productId, setProductId] = useState(null);
  //   const [openAdd, setOpenAdd] = useState(false);

  const planningPeriod = getPlanning(parseInt(id));
  if (planningPeriod === null) {
    apiGetPlanning(id);
  }

  //   const onMoreInfo = productId => {
  //     history.push(`/import-export/import-warehouse-product/${id}/${productId}`);
  //   };

  return (
    <div>
      {planningPeriod ? (
        <Paper className={classes.info}>
          <h3>Planning Period Code: {planningPeriod.displayId}</h3>
          <h3>From Date: {planningPeriod.fromDate}</h3>
          <h3>Thru Date: {planningPeriod.thruDate}</h3>
          <h3>Created By: {planningPeriod.createdBy}</h3>
          <h3>Created At: {planningPeriod.createdAt}</h3>
          <h3>Updated At: {planningPeriod.updatedAt}</h3>
        </Paper>
      ) : (
        <Paper></Paper>
      )}

      {/* <ProductTable
        warehouseId={id}
        onAddItem={onAddItem}
        onMoreInfo={onMoreInfo}
      />
      <InventoryItemTable warehouseId={id} />

      <AddInventoryItemDialog
        open={openAdd}
        warehouseId={id}
        productId={productId}
        onClose={() => setOpenAdd(false)}
      /> */}
    </div>
  );
};

const format = w => {
  if (w === null) return null;

  return {
    ...w,
    displayId: zeroPad(w.id, 5),
    fromDate: formatDate(w.fromDate),
    thruDate: formatDate(w.thruDate),
    createdAt: formatTime(w.createdAt),
    updatedAt: formatTime(w.updatedAt)
  };
};

const mapState = createSelector(
  state => state.salesroute.planningMap,
  planningMap => ({
    getPlanning: id => format(planningMap[id] || null)
  })
);

const mapDispatch = dispatch => ({
  apiGetPlanning: id =>
    dispatch(apiGet(`/api/sales-route/get-planning/${id}`, GOT_PLANNING))
});

export default connect(mapState, mapDispatch)(PlanningPeriodDetail);
