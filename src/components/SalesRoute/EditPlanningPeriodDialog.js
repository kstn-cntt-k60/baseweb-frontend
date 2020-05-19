import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  makeStyles,
  TextField
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_PLANNING_PERIOD } from "../../actions/salesroute";
import { normalizeDate, dateEquals, zeroPad } from "../../util";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1)
  },
  select: {
    margin: theme.spacing(1)
  }
}));

const EditPlanningPeriodDialog = ({
  open,
  planningPeriodId,
  getPlanningPeriod,
  onClose,
  updatePlanningPeriod
}) => {
  const classes = useStyles();

  const planningPeriod = getPlanningPeriod(planningPeriodId);

  const [fromDate, setFromDate] = useState(planningPeriod.fromDate);
  const [thruDate, setThruDate] = useState(planningPeriod.thruDate);

  const displayId = planningPeriodId ? zeroPad(planningPeriodId, 5) : null;

  const resetValues = () => {
    setFromDate(planningPeriod.fromDate);
    setThruDate(planningPeriod.thruDate);
  };

  useEffect(() => {
    resetValues();
  }, [planningPeriodId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updatePlanningPeriod({
      id: planningPeriodId,
      fromDate: normalizeDate(fromDate),
      thruDate: normalizeDate(thruDate)
    });
  };

  const disabled =
    dateEquals(fromDate, planningPeriod.fromDate) &&
    dateEquals(thruDate, planningPeriod.thruDate);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Planning Period</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              disabled
              id="standard-disabled"
              label="Planning Code"
              defaultValue={displayId}
            />
          </FormControl>
          <FormControl className={classes.select}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="From Date"
                  value={fromDate}
                  onChange={setFromDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </FormControl>
          <FormControl className={classes.select}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Thru Date"
                  value={thruDate}
                  onChange={setThruDate}
                  KeyboardButtonProps={{
                    "aria-label": "change date"
                  }}
                />
              </div>
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
          disabled={disabled}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={disabled}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const defaultPlanningPeriod = {
  fromDate: "2020-01-01T00:00:00.000Z",
  thruDate: "2022-01-01T00:00:00.000Z"
};

const mapState = createSelector(
  state => state.salesroute.planningMap,
  planningMap => ({
    getPlanningPeriod: id => planningMap[id] || defaultPlanningPeriod
  })
);

const mapDispatch = dispatch => ({
  updatePlanningPeriod: body =>
    dispatch(
      apiPost(
        "/api/sales-route/update-planning-period",
        body,
        UPDATED_PLANNING_PERIOD
      )
    )
});

export default connect(mapState, mapDispatch)(EditPlanningPeriodDialog);
