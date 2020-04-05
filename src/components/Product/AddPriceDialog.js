import React, { useState } from "react";
import { connect } from "react-redux";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Button,
  makeStyles
} from "@material-ui/core";

import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { apiPost } from "../../actions";
import { ADDED_PRODUCT_PRICE } from "../../actions/product";

const useStyles = makeStyles(theme => ({
  dialog: {
    width: "500px"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  select: {
    margin: theme.spacing(1),
    width: 200
  },
  effectiveFrom: {
    display: "flex",
    flexDirection: "row"
  }
}));

const AddPriceDialog = ({ productId, open, onClose, addPrice }) => {
  const classes = useStyles();

  const [price, setPrice] = useState(0);
  const [currencyUomId, setCurrencyUomId] = useState("vnd");
  const [effectiveFrom, setEffectiveFrom] = useState(new Date());

  const onCancel = () => {
    setPrice(0);
    setCurrencyUomId("vnd");
    setEffectiveFrom(new Date());
  };

  const onSave = () => {
    addPrice({
      productId,
      price,
      currencyUomId,
      effectiveFrom
    });
    onClose();
  };

  const disableCancel = price === 0 && currencyUomId === "vnd";
  const disableSave = price === 0;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Set New Price</DialogTitle>
      <DialogContent className={classes.dialog}>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Price"
              type="number"
              value={price}
              onChange={e => setPrice(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.select}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currencyUomId}
              onChange={e => setCurrencyUomId(e.target.value)}
            >
              <MenuItem value={"vnd"}>VND</MenuItem>
              <MenuItem value={"usd"}>USD</MenuItem>
            </Select>
          </FormControl>
          <FormControl className={classes.textField}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <div className={classes.effectiveFrom}>
                <KeyboardDatePicker
                  disableToolbar
                  format="dd/MM/yyyy"
                  margin="normal"
                  label="Effective From Date"
                  value={effectiveFrom}
                  onChange={date => setEffectiveFrom(date)}
                />
                <KeyboardTimePicker
                  margin="normal"
                  label="Effective From Time"
                  value={effectiveFrom}
                  onChange={date => setEffectiveFrom(date)}
                />
              </div>
            </MuiPickersUtilsProvider>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={disableCancel}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={disableSave}
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
  addPrice: body =>
    dispatch(
      apiPost("/api/product/add-product-price", body, ADDED_PRODUCT_PRICE)
    )
});

export default connect(mapState, mapDispatch)(AddPriceDialog);
