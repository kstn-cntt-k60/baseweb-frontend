import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { ADDED_INVENTORY_ITEM } from "../../actions/import";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  currency: {
    width: "200px",
    margin: theme.spacing(1)
  }
}));

const AddInventoryItemDialog = ({
  open,
  warehouseId,
  productId,
  onClose,
  saveItem
}) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState("");
  const [unitCost, setUnitCost] = useState("");
  const [currencyUomId, setCurrencyUomId] = useState("vnd");

  const resetValues = () => {
    setQuantity("");
    setUnitCost("");
    setCurrencyUomId("vnd");
  };

  useEffect(() => {
    resetValues();
  }, [warehouseId, productId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    saveItem({
      warehouseId,
      productId,
      quantity,
      unitCost,
      currencyUomId
    });
    onClose();
  };

  const saveDisabled = quantity === "" || unitCost === "";
  const cancelDisabled =
    quantity === "" && unitCost === "" && currencyUomId === "vnd";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Inventory Item</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Quantity"
              type="number"
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.textField}>
            <TextField
              margin="dense"
              label="Unit Cost"
              type="number"
              value={unitCost}
              onChange={e => setUnitCost(e.target.value)}
              fullWidth
            />
          </FormControl>
          <FormControl className={classes.currency}>
            <InputLabel>Currency</InputLabel>
            <Select
              value={currencyUomId}
              onChange={e => setCurrencyUomId(e.target.value)}
              className={classes.weightUom}
            >
              <MenuItem value={"vnd"}>VND</MenuItem>
              <MenuItem value={"usd"}>USD</MenuItem>
            </Select>
          </FormControl>
        </div>
      </DialogContent>
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
    </Dialog>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  saveItem: body =>
    dispatch(
      apiPost("/api/import/add-inventory-item", body, ADDED_INVENTORY_ITEM)
    )
});

export default connect(mapState, mapDispatch)(AddInventoryItemDialog);
