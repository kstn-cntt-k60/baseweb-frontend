import React, { useState } from "react";
import { connect } from "react-redux";
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
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { ADDED_PLANNING_PERIOD } from "../../actions/salesroute";
import { normalizeDate } from "../../util";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  }
}));

const AddPlanningPeriodDialog = ({ open, onClose, savePlanningPeriod }) => {
  const classes = useStyles();

  const [fromDate, setFromDate] = useState(new Date());
  const [thruDate, setThruDate] = useState(new Date());

  const onCancel = () => {
    setFromDate(new Date());
    setThruDate(new Date());
  };

  console.log(fromDate);

  const onSave = () => {
    savePlanningPeriod({
      fromDate: normalizeDate(fromDate),
      thruDate: normalizeDate(thruDate)
    });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new Planning Period</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
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
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  savePlanningPeriod: body =>
    dispatch(
      apiPost(
        "/api/sales-route/add-planning-period",
        body,
        ADDED_PLANNING_PERIOD
      )
    )
});

export default connect(mapState, mapDispatch)(AddPlanningPeriodDialog);
