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
  detail,
  onCancel,
  onAdd,
  addedCheckinSequence,
  addCheckinFailedSequence
}) => {
  const classes = useStyles();
  const [state, setState] = useState("INIT");

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
      onCancel();
    }
  }, [addedCheckinSequence]);

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
    }
  }, [addCheckinFailedSequence]);

  const onAddCheckin = () => {
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
            Planning Code: {detail.planningCode}
          </div>
          <div className={classes.more}>From Date: {detail.fromDate}</div>
          <div className={classes.more}>Thru Date: {detail.thruDate}</div>
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>
            To Customer: {detail.customerName}
          </div>
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>
            Sales Route Config: {detail.configCode}
          </div>
          <div className={classes.more}>Repeat Week: {detail.repeatWeek}</div>
          <div className={classes.more}>Day List: {detail.dayList}</div>
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
          onClick={onAddCheckin}
        >
          Checkin
        </Button>
      </div>
    </div>
  );
};

const mapState = state => ({
  addedCheckinSequence: state.salesman.addedCheckinSequence,
  addCheckinFailedSequence: state.salesman.addCheckinFailedSequence
});

export default connect(mapState)(FinalStep);
