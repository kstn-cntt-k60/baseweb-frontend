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

const FinalStep = ({
  planning,
  customer,
  salesman,
  config,
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
          <div className={classes.title}>To Customer: {customer.name}</div>
          <div className={classes.more}>Created At: {customer.createdAt}</div>
          <div className={classes.more}>Updated At: {customer.updatedAt}</div>
          <div className={classes.more}>
            Description: {customer.description}
          </div>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>Salesman: {salesman.username}</div>
          <div className={classes.more}>Created By: {salesman.createdBy}</div>
          <div className={classes.more}>Created At: {salesman.createdAt}</div>
          <div className={classes.more}>Updated At: {salesman.updatedAt}</div>
          <div className={classes.more}>
            Description: {customer.description}
          </div>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>
            Sales Route Config: {config.displayId}
          </div>
          <div className={classes.more}>Repeat Week: {config.repeatWeek}</div>
          <div className={classes.more}>Day List: {config.dayList}</div>
          <div className={classes.more}>Created By: {config.createdBy}</div>
          <div className={classes.more}>Created At: {config.createdAt}</div>
          <div className={classes.more}>Updated At: {config.updatedAt}</div>
          <div className={classes.more}>
            Description: {customer.description}
          </div>
        </div>
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
