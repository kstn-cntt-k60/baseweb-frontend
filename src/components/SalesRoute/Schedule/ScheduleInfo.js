import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";

import { Paper, makeStyles } from "@material-ui/core";
import { createSelector } from "reselect";
import { apiGet } from "../../../actions";
import { GOT_SCHEDULE } from "../../../actions/schedule";
import { zeroPad, formatDate, formatTime } from "../../../util";

const useStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(1)
  },
  title: {
    ...theme.typography.subtitle1
  },
  more: {
    ...theme.typography.subtitle2,
    color: "rgba(0, 0, 0, 0.54)",
    paddingLeft: theme.spacing(2)
  },
  shipTo: {
    ...theme.typography.subtitle1,
    paddingLeft: theme.spacing(2)
  },
  paper: {
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

const ScheduleInfo = ({ getSchedule, apiGetSchedule }) => {
  const classes = useStyles();
  const { id } = useParams();

  const schedule = getSchedule(parseInt(id));
  if (schedule === null) {
    apiGetSchedule(id);
  }

  return (
    <div>
      {schedule ? (
        <div>
          <Paper className={classes.paper}>
            <div className={classes.info}>
              <div className={classes.title}>
                Planning Period: {schedule.displayPlanningId}
              </div>
              <div className={classes.more}>From Date: {schedule.fromDate}</div>
              <div className={classes.more}>Thru Date: {schedule.thruDate}</div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.info}>
              <div className={classes.title}>
                Salesman: {schedule.salesmanName}
              </div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.info}>
              <div className={classes.title}>
                Store Name: {schedule.storeName}
              </div>
              <div className={classes.more}>Address: {schedule.address}</div>
            </div>
          </Paper>
          <Paper className={classes.paper}>
            <div className={classes.info}>
              <div className={classes.title}>
                Customer: {schedule.customerName}
              </div>
            </div>
          </Paper>

          <Paper className={classes.paper}>
            <div className={classes.info}>
              <div className={classes.title}>
                Sales Route Config: {schedule.displayConfigId}
              </div>
              <div className={classes.more}>
                Repeat Week: {schedule.repeatWeek}
              </div>
              <div className={classes.more}>Day List: {schedule.dayList}</div>
            </div>
          </Paper>
        </div>
      ) : (
        <Paper></Paper>
      )}
    </div>
  );
};

const format = schedule => {
  if (schedule === null) return null;
  return {
    ...schedule,
    displayPlanningId: zeroPad(schedule.planningId, 5),
    displayConfigId: zeroPad(schedule.configId, 5),
    fromDate: formatDate(schedule.fromDate),
    thruDate: formatDate(schedule.thruDate),
    createdAt: formatTime(schedule.createdAt),
    updatedAt: formatTime(schedule.updatedAt)
  };
};

const mapState = createSelector(
  state => state.schedule.scheduleMap,
  scheduleMap => ({
    getSchedule: id => format(scheduleMap[id] ? scheduleMap[id] : null)
  })
);

const mapDispatch = dispatch => ({
  apiGetSchedule: id =>
    dispatch(apiGet(`/api/schedule/get-schedule/${id}`, GOT_SCHEDULE))
});

export default connect(mapState, mapDispatch)(ScheduleInfo);
