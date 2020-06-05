import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { Button, Paper, makeStyles } from "@material-ui/core";

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
  paper: {
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  storePaper: {
    margin: theme.spacing(1)
  }
}));

const FinalStep = ({
  planning,
  stores,
  salesman,
  onCancel,
  onAdd,
  addedScheduleSequence,
  addScheduleFailedSequence
}) => {
  const classes = useStyles();
  const [state, setState] = useState("INIT");

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
      onCancel();
    }
  }, [addedScheduleSequence]);

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
    }
  }, [addScheduleFailedSequence]);

  const onAddSchedule = () => {
    setState("ADDING");
    onAdd();
  };

  const onClickCancel = () => {
    setState("INIT");
    onCancel();
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>
            Planning Period: {planning.displayId}
          </div>
          <div className={classes.more}>From Date: {planning.fromDate}</div>
          <div className={classes.more}>Thru Date: {planning.thruDate}</div>
          <div className={classes.more}>Created By: {planning.createdBy}</div>
          <div className={classes.more}>Created At: {planning.createdAt}</div>
          <div className={classes.more}>Updated At: {planning.updatedAt}</div>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>Salesman: {salesman.username}</div>
          <div className={classes.more}>Created By: {salesman.createdBy}</div>
          <div className={classes.more}>Created At: {salesman.createdAt}</div>
          <div className={classes.more}>Updated At: {salesman.updatedAt}</div>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        {Object.values(stores).map(store => (
          <div
            key={store.id}
            style={{ padding: "10px", background: "#ffecb3" }}
          >
            <Paper className={classes.storePaper}>
              <div className={classes.info}>
                <div className={classes.title}>
                  To Customer Store: {store.storeName}
                </div>
                <div className={classes.more}>Address: {store.address}</div>
                <div className={classes.more}>
                  Customer Name: {store.customerName}
                </div>
                <div className={classes.more}>
                  Sales Route Config: {store.config.displayId}
                </div>
                <div className={classes.more}>
                  Repeat Week: {store.config.repeatWeek}
                </div>
                <div className={classes.more}>
                  Day List: {store.config.dayList}
                </div>
                <div className={classes.more}>
                  Created By: {store.config.createdBy}
                </div>
              </div>
            </Paper>
          </div>
        ))}
      </Paper>

      <div className={classes.buttons}>
        <Button variant="contained" color="secondary" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={state !== "INIT"}
          onClick={onAddSchedule}
        >
          Add Schedule
        </Button>
      </div>
    </div>
  );
};

const mapState = state => ({
  addedScheduleSequence: state.schedule.addedScheduleSequence,
  addScheduleFailedSequence: state.schedule.addScheduleFailedSequence
});

export default connect(mapState)(FinalStep);
