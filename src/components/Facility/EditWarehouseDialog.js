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
  TextField,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_WAREHOUSE } from "../../actions/facility";

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

const EditWarehouseDialog = ({
  open,
  warehouseId,
  getWarehouse,
  onClose,
  updateWarehouse
}) => {
  const classes = useStyles();

  const warehouse = getWarehouse(warehouseId);

  const [name, setName] = useState(warehouse.name);
  const [addr, setAddr] = useState(warehouse.address);

  const resetValues = () => {
    setName(warehouse.name);
    setAddr(warehouse.address);
  };

  useEffect(() => {
    resetValues();
  }, [warehouseId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateWarehouse({
      id: warehouseId,
      name,
      address: addr
    });
  };

  const disabled = name === warehouse.name && addr === warehouse.address;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Warehouse </DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Warehouse Name"
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
        </div>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onCancel}
          disabled={disabled}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={onSave}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const emptyWarehouse = {
  id: null,
  name: "",
  address: ""
};

const mapState = createSelector(
  state => state.facility.warehouseMap,
  warehouseMap => ({
    getWarehouse: id => warehouseMap[id] || emptyWarehouse
  })
);

const mapDispatch = dispatch => ({
  updateWarehouse: body =>
    dispatch(apiPost("/api/facility/update-warehouse", body, UPDATED_WAREHOUSE))
});

export default connect(mapState, mapDispatch)(EditWarehouseDialog);
