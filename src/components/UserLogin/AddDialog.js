import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  List,
  ListItem,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  Button,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import {
  resetSearchPerson,
  ADDED_USER_LOGIN,
  GOT_SEARCH_PERSON
} from "../../actions/account";

import { apiGet } from "../../actions";
import { formatDate, getGender } from "../../util";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1),
    minWidth: 300
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  failed: {
    color: "red"
  },
  search: ({ focus }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid",
    borderWidth: "1px",
    borderColor: focus ? "blue" : "#aaa",
    boxShadow: focus ? "0 0 10px 0px blue" : "none",
    marginTop: "16px",
    borderRadius: "15px",
    padding: "0px 10px"
  }),
  searchInput: {
    outline: "none",
    width: "100%",
    border: "none",
    height: "35px",
    fontSize: theme.typography.htmlFontSize
  },
  searchItem: {
    borderRadius: "5px",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#aaa",
    fontSize: theme.typography.htmlFontSize,
    marginBottom: "2px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#ddd"
    }
  },
  chosen: {
    borderRadius: "5px",
    border: "solid",
    borderWidth: "1px",
    borderColor: "#aaa",
    fontSize: theme.typography.htmlFontSize,
    padding: "8px 16px"
  },
  none: {
    color: "red"
  }
}));

const SearchItem = ({ person, classes, onSelectPerson }) => (
  <ListItem
    className={classes.searchItem}
    onClick={() => onSelectPerson(person)}
  >
    {person.lastName} {person.middleName} {person.firstName}{" "}
    {formatDate(person.birthDate)} {getGender(person.genderId)}
  </ListItem>
);

const AddDialog = ({
  open,
  personList,
  onClose,
  searchPerson,
  onResetSearch,
  onAdd
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [query, setQuery] = useState("");
  const [chosenPerson, setChosenPerson] = useState(null);

  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  const resetValues = () => {
    setUsername("");
    setPassword("");
    setPasswordConfirm("");
    setQuery("");
    setChosenPerson(null);
    setFocus(false);
    if (personList.length !== 0) {
      onResetSearch();
    }
  };

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    onAdd({
      username,
      password,
      personId: chosenPerson.id
    });
    onClose();
  };

  const onSearch = e => {
    e.preventDefault();
    searchPerson(query);
  };

  const onSelectPerson = person => {
    setQuery("");
    setChosenPerson(person);
    onResetSearch();
  };

  const cancelDisabled =
    username === "" &&
    password === "" &&
    passwordConfirm === "" &&
    chosenPerson === null;

  const saveDisabled =
    username === "" ||
    password === "" ||
    password !== passwordConfirm ||
    chosenPerson === null;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add User Login</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Username"
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              fullWidth
            />
          </FormControl>

          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              fullWidth
            />
          </FormControl>

          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Password Confirmation"
              type="password"
              value={passwordConfirm}
              error={password !== passwordConfirm}
              helperText={
                password !== passwordConfirm ? "Password not match!" : ""
              }
              onChange={e => setPasswordConfirm(e.target.value)}
              fullWidth
            />
          </FormControl>
          <div>
            {chosenPerson ? (
              <div className={classes.chosen}>
                {chosenPerson.lastName} {chosenPerson.middleName}{" "}
                {chosenPerson.firstName} {formatDate(chosenPerson.birthDate)}{" "}
                {getGender(chosenPerson.genderId)}
              </div>
            ) : (
              <Typography variant="subtitle1">
                Person: <span className={classes.none}>None</span>
              </Typography>
            )}
          </div>
          <form onSubmit={onSearch}>
            <div className={classes.search}>
              <SearchIcon />
              <input
                className={classes.searchInput}
                placeholder="Search Person ..."
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
              />
            </div>
            <List>
              {personList.map(person => (
                <SearchItem
                  key={person.id}
                  classes={classes}
                  person={person}
                  onSelectPerson={onSelectPerson}
                />
              ))}
            </List>
          </form>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          disabled={cancelDisabled}
          onClick={onCancel}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          disabled={saveDisabled}
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
  state => state.account.searchPerson,
  personList => ({
    personList
  })
);

const mapDispatch = dispatch => ({
  searchPerson: query =>
    dispatch(
      apiGet(
        `/api/account/query-simple-person?query=${encodeURIComponent(query)}`,
        GOT_SEARCH_PERSON
      )
    ),
  onResetSearch: () => dispatch(resetSearchPerson()),
  onAdd: body =>
    dispatch(apiPost("/api/account/add-user-login", body, ADDED_USER_LOGIN))
});

export default connect(mapState, mapDispatch)(AddDialog);
