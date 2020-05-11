import React, { useState } from "react";

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

export const getQuantityAvailable = (product, products) => {
  if (!product) return 0;

  const sum = products
    .filter(p => p.id === product.id)
    .map(p => parseFloat(p.quantity))
    .reduce((a, b) => a + b, 0);

  return parseFloat(product.quantityAvailable) - sum;
};

const AddProductDialog = ({ open, product, products, onClose, addProduct }) => {
  const classes = useStyles();

  const [quantity, setQuantity] = useState("");

  const onCancel = () => {
    setQuantity("");
  };

  const onAdd = () => {
    addProduct({
      ...product,
      quantity
    });
    setQuantity("");
  };

  const parsed = parseFloat(quantity);
  const quantityAvailable = getQuantityAvailable(product, products);
  const exceeded = parsed > quantityAvailable;

  const disabled = isNaN(parsed) || parsed <= 0.0 || exceeded;
  const disableCancel = quantity === "";

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Product</DialogTitle>
      <DialogContent>
        <h4>Product Name: {product && product.name}</h4>
        <h4>Weight: {product && product.weight}</h4>
        <h4>Price: {product && product.price}</h4>
        <h4>Quantity Available: {quantityAvailable}</h4>
        <div className={classes.content}>
          <FormControl className={classes.textField}>
            <TextField
              autoFocus
              margin="dense"
              label="Quantity"
              type="number"
              value={quantity}
              error={exceeded}
              helperText={exceeded ? "Quantity exceeded available!" : ""}
              onChange={e => setQuantity(e.target.value)}
              fullWidth
            />
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
          onClick={onAdd}
          disabled={disabled}
          variant="contained"
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddProductDialog;
