import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  makeStyles,
  TextField,
  FormLabel,
  FormGroup,
  FormControlLabel,
  Checkbox
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_CONFIG } from "../../actions/salesroute";
import { zeroPad, setDifference } from "../../util";

const useStyles = makeStyles(theme => ({
  dialog: {
    minWidth: 400
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    width: 100
  },
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

const EditConfigDialog = ({
  open,
  configId,
  getConfig,
  onClose,
  updateConfig
}) => {
  const classes = useStyles();

  const config = getConfig(configId);

  const [repeatWeek, setRepeatWeek] = useState(config.repeatWeek);
  const [days, setDays] = useState(config.days);

  const displayId = configId ? zeroPad(configId, 5) : null;

  const resetValues = () => {
    setRepeatWeek(config.repeatWeek);
    setDays(config.days);
  };

  useEffect(() => {
    resetValues();
  }, [configId]);

  const onCancel = () => {
    resetValues();
  };

  const dayObjectToSet = obj => new Set(dayList.filter(day => obj[day]));

  const onSave = () => {
    const currentSet = dayObjectToSet(days);
    const oldSet = dayObjectToSet(config.days);

    const toBeInsert = setDifference(currentSet, oldSet);

    const toBeDelete = setDifference(oldSet, currentSet);
    updateConfig({
      id: configId,
      repeatWeek: repeatWeek,
      toBeInsert: [...toBeInsert],
      toBeDelete: [...toBeDelete]
    });
  };

  const equals =
    dayList.every(day => days[day] === config.days[day]) &&
    repeatWeek === config.repeatWeek;
  const disableCancel = equals;
  const disableSave =
    equals || repeatWeek < 1 || Object.values(days).every(d => !d);

  const handleChange = day => () => {
    setDays({ ...days, [day]: !days[day] });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle className={classes.dialog}>Edit Config</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              disabled
              id="standard-disabled"
              label="Config Code"
              defaultValue={displayId}
            />
          </FormControl>
          <FormControl className={classes.repeatWeek}>
            <TextField
              margin="dense"
              label="Repeat Week"
              type="number"
              value={repeatWeek}
              onChange={e => setRepeatWeek(parseInt(e.target.value))}
            />
          </FormControl>
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          variant="contained"
          color="secondary"
          disabled={disableCancel}
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          variant="contained"
          color="primary"
          disabled={disableSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const defaultDays = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false
};

const defaultConfig = {
  repeatWeek: 1,
  days: defaultDays
};

const daysStringToObject = s => {
  const array = s.split(",").map(n => parseInt(n));
  const result = { ...defaultDays };

  array.forEach(n => {
    result[n] = true;
  });

  return result;
};

const formatConfig = config => ({
  repeatWeek: config.repeatWeek,
  days: daysStringToObject(config.dayList)
});

const mapState = createSelector(
  state => state.salesroute.configMap,
  configMap => ({
    getConfig: id =>
      configMap[id] ? formatConfig(configMap[id]) : defaultConfig
  })
);

const mapDispatch = dispatch => ({
  updateConfig: body =>
    dispatch(
      apiPost("/api/sales-route/update-salesroute-config", body, UPDATED_CONFIG)
    )
});

export default connect(mapState, mapDispatch)(EditConfigDialog);
