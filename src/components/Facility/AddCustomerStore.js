import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Button,
  DialogActions,
  FormControl,
  TextField,
  List,
  ListItem,
  Typography,
  makeStyles
} from "@material-ui/core";

import { apiGet, apiPost } from "../../actions";
import {
  ADDED_CUSTOMER_STORE,
  GOT_SEARCH_CUSTOMER
} from "../../actions/facility";

import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  search: ({ focus }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid",
    borderWidth: "1px",
    borderColor: focus ? "blue" : "#aaa",
    boxShadow: focus ? "0 0 10px 0 blue" : "none",
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

const SearchItem = ({ customer, classes, onSelectCustomer }) => (
  <ListItem
    className={classes.searchItem}
    onClick={() => onSelectCustomer(customer)}
  >
    {customer.name}
  </ListItem>
);

const AddCustomerStore = ({
  customerList,
  customerListSequence,
  saveCustomerStore,
  searchCustomer
}) => {
  const [name, setName] = useState("");
  const [addr, setAddr] = useState("");
  const [focus, setFocus] = useState(false);
  const [query, setQuery] = useState("");
  const [chosenCustomer, setChosenCustomer] = useState(null);
  const [sequence, setSequence] = useState(0);

  const classes = useStyles({ focus });

  const onCancel = () => {
    setName("");
    setAddr("");
    setChosenCustomer(null);
    setSequence(sequence + 1);
  };

  const onSave = () => {
    saveCustomerStore({
      name,
      address: addr,
      customerId: chosenCustomer.id
    });
  };

  const onSearch = e => {
    e.preventDefault();
    searchCustomer(query);
  };

  const onSelectCustomer = customer => {
    setChosenCustomer(customer);
    setSequence(sequence + 1);
  };

  const cancelDisabled = name === "" && addr === "" && chosenCustomer === null;
  const saveDisabled = name === "" || addr === "" || chosenCustomer === null;

  return (
    <div>
      <div className={classes.content}>
        <FormControl className={classes.textField}>
          <TextField
            autoFocus
            margin="dense"
            label="Store Name"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            fullWidth
          />
        </FormControl>
        <FormControl className={classes.textField}>
          <TextField
            margin="dense"
            label="Address"
            type="text"
            value={addr}
            onChange={e => setAddr(e.target.value)}
            fullWidth
          />
        </FormControl>

        <div>
          {chosenCustomer ? (
            <div className={classes.chosen}>{chosenCustomer.name}</div>
          ) : (
            <Typography variant="subtitle1">
              Customer: <span className={classes.none}>None</span>
            </Typography>
          )}
        </div>
        <form onSubmit={onSearch}>
          <div className={classes.search}>
            <SearchIcon />
            <input
              className={classes.searchInput}
              placeholder="Search Customer ..."
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              onFocus={() => setFocus(true)}
              onBlur={() => setFocus(false)}
            />
          </div>
          <List>
            {sequence < customerListSequence
              ? customerList.map(customer => (
                <SearchItem
                  key={customer.id}
                  classes={classes}
                  customer={customer}
                  onSelectCustomer={onSelectCustomer}
                />
              ))
              : null}
          </List>
        </form>
      </div>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={cancelDisabled}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={saveDisabled}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </div>
  );
};

const mapState = state => ({
  customerList: state.facility.customerList,
  customerListSequence: state.facility.customerListSequence
});

const mapDispatch = dispatch => ({
  saveCustomerStore: body =>
    dispatch(
      apiPost("/api/facility/add-customer-store", body, ADDED_CUSTOMER_STORE)
    ),
  searchCustomer: query =>
    dispatch(
      apiGet(
        `/api/facility/query-simple-customer?query=${encodeURIComponent(
          query
        )}`,
        GOT_SEARCH_CUSTOMER
      )
    )
});

export default connect(mapState, mapDispatch)(AddCustomerStore);
