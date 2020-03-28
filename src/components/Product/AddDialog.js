import React, { useState } from "react";
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
  MenuItem,
  InputLabel,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { ADDED_PRODUCT } from "../../actions/product";

const useStyles = makeStyles(theme => ({
  content: {
    display: "flex",
    flexDirection: "column"
  },
  textField: {
    margin: theme.spacing(1),
    minWidth: 400
  },
  weight: {
    margin: theme.spacing(1),
    display: "flex",
    alignItems: "flex-end"
  },
  weightInput: {
    width: "200px",
    marginBottom: theme.spacing(1)
  },
  weightUom: {
    marginBottom: theme.spacing(1)
  },
  unitUom: {
    margin: theme.spacing(1),
    width: 200
  }
}));

const AddDialog = ({ open, onClose, saveProduct }) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [weight, setWeight] = useState("");
  const [weightUomId, setWeightUomId] = useState("kg");
  const [unitUomId, setUnitUomId] = useState("package");

  const onCancel = () => {
    setName("");
    setDescription("");
    setWeight("");
    setWeightUomId("kg");
    setUnitUomId("package");
  };

  const onSave = () => {
    saveProduct({
      name,
      description,
      weight: weight === "" ? null : weight,
      weightUomId,
      unitUomId
    });
    onClose();
  };

  const disabled = name === "";
  const disableCancel =
    name === "" &&
    description === "" &&
    weight === "" &&
    weightUomId === "kg" &&
    unitUomId === "package";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Product's Name"
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              fullWidth
            />
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
          <div className={classes.weight}>
            <TextField
              className={classes.weightInput}
              margin="dense"
              label="Weight"
              type="number"
              value={weight}
              onChange={e => setWeight(e.target.value)}
              fullWidth
            />
            <Select
              value={weightUomId}
              onChange={e => setWeightUomId(e.target.value)}
              className={classes.weightUom}
            >
              <MenuItem value={"kg"}>kg</MenuItem>
              <MenuItem value={"g"}>g</MenuItem>
              <MenuItem value={"mg"}>mg</MenuItem>
            </Select>
          </div>
        </div>
        <FormControl className={classes.unitUom}>
          <InputLabel>Product Unit</InputLabel>
          <Select
            value={unitUomId}
            onChange={e => setUnitUomId(e.target.value)}
            className={classes.weightUom}
          >
            <MenuItem value={"package"}>package</MenuItem>
            <MenuItem value={"box"}>box</MenuItem>
            <MenuItem value={"bottle"}>bottle</MenuItem>
          </Select>
        </FormControl>
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

const mapState = () => ({});

const mapDispatch = dispatch => ({
  saveProduct: body =>
    dispatch(apiPost("/api/product/save-product", body, ADDED_PRODUCT))
});

export default connect(mapState, mapDispatch)(AddDialog);
