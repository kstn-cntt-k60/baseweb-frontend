import React from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { formatTime, formatDate, zeroPad } from "../../util";
import { apiGet } from "../../actions";

import { makeStyles } from "@material-ui/core";

import { Paper } from "@material-ui/core";
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

  const planningPeriod = getPlanning(parseInt(id));
  if (planningPeriod === null) {
    apiGetPlanning(id);
  }

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
