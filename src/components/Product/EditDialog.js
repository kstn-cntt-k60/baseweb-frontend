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
  Select,
  MenuItem,
  InputLabel,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../actions";
import { UPDATED_PRODUCT } from "../../actions/product";

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

const EditDialog = ({
  open,
  productId,
  getProduct,
  onClose,
  updateProduct
}) => {
  const classes = useStyles();

  const product = getProduct(productId);

  const [name, setName] = useState(product.name);
  const [description, setDescription] = useState(product.description);
  const [weight, setWeight] = useState(product.weight);
  const [weightUomId, setWeightUomId] = useState(product.weightUomId);
  const [unitUomId, setUnitUomId] = useState(product.unitUomId);

  const resetValues = () => {
    setName(product.name);
    setDescription(product.description);
    setWeight(product.weight);
    setWeightUomId(product.weightUomId);
    setUnitUomId(product.unitUomId);
  };

  useEffect(() => {
    resetValues();
  }, [productId]);

  const onCancel = () => {
    resetValues();
  };

  const onSave = () => {
    updateProduct({
      id: productId,
      name,
      description,
      weight: weight === "" ? null : weight,
      weightUomId,
      unitUomId
    });
  };

  const disabled =
    name === product.name &&
    description === product.description &&
    weight === product.weight &&
    weightUomId === product.weightUomId &&
    unitUomId === product.unitUomId;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Product</DialogTitle>
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

const emptyProduct = {
  id: null,
  name: "",
  weight: null,
  weightUomId: "kg",
  description: "",
  unitUomId: "package"
};

const weightNonNull = product => ({
  ...product,
  weight: product.weight === null ? "" : product.weight
});

const mapState = createSelector(
  state => state.product.productMap,
  productMap => ({
    getProduct: id => weightNonNull(productMap[id] || emptyProduct)
  })
);

const mapDispatch = dispatch => ({
  updateProduct: body =>
    dispatch(apiPost("/api/product/update-product", body, UPDATED_PRODUCT))
});

export default connect(mapState, mapDispatch)(EditDialog);
