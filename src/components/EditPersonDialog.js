import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  makeStyles
} from "@material-ui/core";

import "date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import { closeEditPersonDialog, updatePersonAction } from "../actions/account";
import { STATE_LOADING, STATE_FAILED } from "../reducers/account";
import { dateEquals } from "../util";

const useStyles = makeStyles(theme => ({
  select: {
    margin: theme.spacing(1),
    width: 200
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  nameField: {
    margin: theme.spacing(1),
    width: 150
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
}));

const EditPersonDialog = ({
  open,
  state,
  person,
  closeDialog,
  updatePerson
}) => {
  const classes = useStyles();

  const [description, setDescription] = useState(person.description);
  const [firstName, setFirstName] = useState(person.firstName);
  const [middleName, setMiddleName] = useState(person.middleName);
  const [lastName, setLastName] = useState(person.lastName);
  const [gender, setGender] = useState(person.genderId);
  const [birthDate, setBirthDate] = useState(person.birthDate);

  const resetValues = () => {
    setDescription(person.description);
    setFirstName(person.firstName);
    setMiddleName(person.middleName);
    setLastName(person.lastName);
    setGender(person.genderId);
    setBirthDate(person.birthDate);
  };

  useEffect(() => {
    resetValues();
  }, [person.id]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updatePerson({
      id: person.id,
      description,
      firstName,
      middleName,
      lastName,
      genderId: gender,
      birthDate: birthDate
    });
  };

  const disabled =
    description === person.description &&
    firstName === person.firstName &&
    middleName === person.middleName &&
    lastName === person.lastName &&
    gender === person.genderId &&
    dateEquals(birthDate, person.birthDate);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Edit Person</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Description"
              type="text"
              value={description}
              onChange={e => setDescription(e.target.value)}
              fullWidth
            />
          </FormControl>

          <div>
            <FormControl className={classes.nameField}>
              <TextField
                autoFocus
                margin="dense"
                label="First Name"
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.nameField}>
              <TextField
                margin="dense"
                label="Middle Name"
                type="text"
                value={middleName}
                onChange={e => setMiddleName(e.target.value)}
                fullWidth
              />
            </FormControl>
            <FormControl className={classes.nameField}>
              <TextField
                margin="dense"
                label="Last Name"
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                fullWidth
              />
            </FormControl>
          </div>
          <FormControl className={classes.select}>
            <InputLabel>Gender</InputLabel>
            <Select value={gender} onChange={e => setGender(e.target.value)}>
              <MenuItem value={1}>Male</MenuItem>
              <MenuItem value={2}>Female</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.select}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Birth Date"
                  value={birthDate}
                  onChange={date => setBirthDate(date.toISOString())}
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
        {state === STATE_LOADING ? <CircularProgress /> : ""}
        {state === STATE_FAILED ? "Save failed" : ""}
        <Button
          disabled={disabled}
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
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

const mapState = createSelector(
  state => state.account.openEditPersonDialog,
  state => state.account.editPersonState,
  state => state.account.personMap,
  state => state.account.editPersonId,
  (open, state, personMap, id) => ({
    open,
    state,
    person: personMap[id] || {
      description: "",
      firstName: "",
      middleName: "",
      lastName: "",
      genderId: 1,
      birthDate: "2000-01-01T00:00:00.000Z"
    }
  })
);

const mapDispatch = dispatch => ({
  closeDialog: () => dispatch(closeEditPersonDialog()),
  updatePerson: body => dispatch(updatePersonAction(body))
});

export default connect(mapState, mapDispatch)(EditPersonDialog);
