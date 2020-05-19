import React, { useState } from "react";
import { connect } from "react-redux";
import "date-fns";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  makeStyles,
  Checkbox,
  FormLabel,
  FormGroup,
  FormControlLabel,
  TextField
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { ADDED_CONFIG } from "../../actions/salesroute";

const useStyles = makeStyles(theme => ({
  formControl: {
    marginTop: theme.spacing(2)
  },
  formGroup: {
    marginLeft: theme.spacing(2)
  },
  repeatWeek: {
    width: 100
  }
}));

const dayList = [1, 2, 3, 4, 5, 6, 0];

const dayNames = {
  0: "Sunday",
  1: "Monday",
  2: "Tuesday",
  3: "Wednesday",
  4: "Thursday",
  5: "Friday",
  6: "Saturday"
};

const AddConfigDialog = ({ open, onClose, saveConfig }) => {
  const classes = useStyles();

  const [repeatWeek, setRepeatWeek] = useState(1);
  const [days, setDays] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false
  });

  const resetDays = () => {
    setDays({
      0: false,
      1: false,
      2: false,
      3: false,
      4: false,
      5: false,
      6: false
    });
  };

  const onCancel = () => {
    setRepeatWeek(1);
    resetDays();
  };

  const onSave = () => {
    saveConfig({
      repeatWeek: parseInt(repeatWeek),
      dayList: Object.keys(days)
        .filter(key => days[key])
        .map(day => parseInt(day))
    });
    onClose();
  };

  const handleChange = day => () => {
    setDays({ ...days, [day]: !days[day] });
  };

  const disabled = Object.values(days).every(d => !d) || repeatWeek < 1;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add new Planning Period</DialogTitle>
      <DialogContent>
        <div>
          <FormControl className={classes.repeatWeek}>
            <TextField
              margin="dense"
              label="Repeat Week"
              type="number"
              value={repeatWeek}
              onChange={e => setRepeatWeek(e.target.value)}
            />
          </FormControl>
        </div>
        <div className={classes.root}>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel>Choose days</FormLabel>
            <FormGroup className={classes.formGroup}>
              {dayList.map(day => (
                <FormControlLabel
                  key={day}
                  control={
                    <Checkbox
                      checked={days[day]}
                      onChange={handleChange(day)}
                    />
                  }
                  label={dayNames[day]}
                />
              ))}
            </FormGroup>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          disabled={disabled}
          onClick={onSave}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  saveConfig: body =>
    dispatch(
      apiPost("/api/sales-route/add-salesroute-config", body, ADDED_CONFIG)
    )
});

export default connect(mapState, mapDispatch)(AddConfigDialog);
