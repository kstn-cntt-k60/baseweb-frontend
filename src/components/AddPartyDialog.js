import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

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

import { closeAddPartyDialog, addParty } from "../actions/account";
import { STATE_LOADING, STATE_FAILED, STATE_INIT } from "../reducers/account";

const useStyles = makeStyles(theme => ({
  select: {
    margin: theme.spacing(1),
    width: 200
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
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

const PersonForm = ({
  classes,
  firstName,
  setFirstName,
  middleName,
  setMiddleName,
  lastName,
  setLastName,
  gender,
  setGender,
  birthDate,
  setBirthDate
}) => (
  <React.Fragment>
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
            onChange={setBirthDate}
            KeyboardButtonProps={{
              "aria-label": "change date"
            }}
          />
        </div>
      </MuiPickersUtilsProvider>
    </FormControl>
  </React.Fragment>
);

const CustomerForm = ({ classes, customerName, setCustomerName }) => (
  <React.Fragment>
    <FormControl className={classes.textField}>
      <TextField
        autoFocus
        margin="dense"
        label="Customer's Name"
        type="text"
        value={customerName}
        onChange={e => setCustomerName(e.target.value)}
        fullWidth
      />
    </FormControl>
  </React.Fragment>
);

const AddPartyDialog = ({ open, state, closeDialog, onAddParty }) => {
  const classes = useStyles();

  const [partyType, setPartyType] = useState(1);
  const [description, setDescription] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState(1);
  const [birthDate, setBirthDate] = useState("2000-01-01T00:00:00.000Z");
  const [customerName, setCustomerName] = useState("");

  useEffect(() => {
    if (state === STATE_INIT) {
      setDescription("");
      setFirstName("");
      setMiddleName("");
      setLastName("");
      setGender(1);
      setBirthDate("2000-01-01T00:00:00.000Z");
      setCustomerName("");
    }
  }, [state]);

  const onAdd = () => {
    if (partyType === 1) {
      onAddParty({
        partyTypeId: partyType,
        description,
        firstName,
        middleName,
        lastName,
        genderId: gender,
        birthDate
      });
    } else if (partyType === 2) {
      onAddParty({
        partyTypeId: partyType,
        description,
        customerName
      });
    }
  };

  const enableAdd = () => {
    if (state === STATE_LOADING) return false;

    if (partyType === 1) {
      return firstName !== "" && lastName !== "";
    } else if (partyType === 2) {
      return customerName !== "";
    }
    return false;
  };

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Add Party</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.select}>
            <InputLabel>Party Type</InputLabel>
            <Select
              value={partyType}
              onChange={e => setPartyType(e.target.value)}
            >
              <MenuItem value={1}>Person</MenuItem>
              <MenuItem value={2}>Customer</MenuItem>
            </Select>
          </FormControl>
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
          {partyType === 1 ? (
            <PersonForm
              classes={classes}
              firstName={firstName}
              setFirstName={setFirstName}
              middleName={middleName}
              setMiddleName={setMiddleName}
              lastName={lastName}
              setLastName={setLastName}
              gender={gender}
              setGender={setGender}
              birthDate={birthDate}
              setBirthDate={setBirthDate}
            />
          ) : (
            <CustomerForm
              classes={classes}
              customerName={customerName}
              setCustomerName={setCustomerName}
            />
          )}
        </div>
      </DialogContent>
      <DialogActions>
        {state === STATE_LOADING ? <CircularProgress /> : ""}
        {state === STATE_FAILED ? "Add failed" : ""}
        <Button onClick={closeDialog} variant="contained" color="secondary">
          Cancel
        </Button>
        <Button
          disabled={!enableAdd()}
          onClick={onAdd}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapState = state => ({
  open: state.account.openAddPartyDialog,
  state: state.account.addPartyState
});

const mapDispatch = dispatch => ({
  closeDialog: () => dispatch(closeAddPartyDialog()),
  onAddParty: body => dispatch(addParty(body))
});

export default connect(mapState, mapDispatch)(AddPartyDialog);
