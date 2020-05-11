import React, { useState } from "react";
import { connect } from "react-redux";

import SelectCustomer from "./SelectCustomer";
import SelectWarehouse from "./SelectWarehouse";
import SelectProducts from "./SelectProducts";
import ShipTo from "./ShipTo";
import FinalStep from "./FinalStep";

import {
  Paper,
  Button,
  Stepper,
  Step,
  StepLabel,
  makeStyles
} from "@material-ui/core";

import { apiPost } from "../../../actions";
import { ADDED_ORDER, ADD_ORDER_FAILED } from "../../../actions/order";

const steps = [
  "Select Customer",
  "Select Warehouse",
  "Select Products",
  "Ship to"
];

const useStyles = makeStyles(theme => ({
  stepper: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  }
}));

const AddOrderStep = ({
  step,
  customer,
  onSelectCustomer,
  warehouse,
  onSelectWarehouse,
  products,
  setProducts,
  store,
  onSelectStore,
  address,
  setAddress,
  onCancel,
  onAdd
}) => {
  switch (step) {
    case 0:
      return (
        <SelectCustomer
          selectedCustomer={customer}
          onSelectCustomer={onSelectCustomer}
        />
      );

    case 1:
      return (
        <SelectWarehouse selected={warehouse} onSelect={onSelectWarehouse} />
      );

    case 2:
      return (
        <SelectProducts
          products={products}
          warehouse={warehouse}
          setProducts={setProducts}
        />
      );

    case 3:
      return (
        <ShipTo
          customer={customer}
          selectedStore={store}
          onSelectStore={onSelectStore}
          address={address}
          setAddress={setAddress}
        />
      );

    case 4:
      return (
        <FinalStep
          customer={customer}
          warehouse={warehouse}
          products={products}
          store={store}
          address={address}
          onCancel={onCancel}
          onAdd={onAdd}
        />
      );

    default:
      return <div></div>;
  }
};

const allowNext = (step, customer, warehouse, products, store, address) => {
  switch (step) {
    case 0:
      return customer !== null;

    case 1:
      return warehouse !== null;

    case 2:
      return products.length > 0;

    case 3:
      return store !== null || address !== "";

    default:
      return true;
  }
};

const AddOrder = ({ addOrder }) => {
  const classes = useStyles();

  const [activeStep, setActiveStep] = useState(0);
  const [customer, setCustomer] = useState(null);
  const [warehouse, setWarehouse] = useState(null);
  const [products, setProducts] = useState([]);
  const [store, setStore] = useState(null);
  const [address, setAddress] = useState("");

  const next = () => setActiveStep(activeStep + 1);

  const onSelectCustomer = customer => {
    setCustomer(customer);
    setStore(null);
    next();
  };

  const onSelectWarehouse = warehouse => {
    setWarehouse(warehouse);
    next();
  };

  const onSelectStore = newStore => {
    if (newStore.id !== (store && store.id)) {
      setStore(newStore);
    } else {
      setStore(null);
    }
  };

  const onCancel = () => {
    setActiveStep(0);
    setCustomer(null);
    setWarehouse(null);
    setProducts([]);
    setStore(null);
    setAddress("");
  };

  const onAdd = () => {
    addOrder({
      customerId: customer.id,
      warehouseId: warehouse.id,
      products: products.map(p => ({
        id: p.id,
        quantity: p.quantity
      })),
      address,
      customerStoreId: store && store.id
    });
  };

  return (
    <div>
      <AddOrderStep
        step={activeStep}
        customer={customer}
        onSelectCustomer={onSelectCustomer}
        warehouse={warehouse}
        onSelectWarehouse={onSelectWarehouse}
        products={products}
        setProducts={setProducts}
        store={store}
        onSelectStore={onSelectStore}
        address={address}
        setAddress={setAddress}
        onCancel={onCancel}
        onAdd={onAdd}
      />
      <Paper className={classes.stepper}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button
          disabled={activeStep <= 0}
          onClick={() => setActiveStep(activeStep - 1)}
          variant="contained"
          color="primary"
        >
          Back
        </Button>
        {activeStep < steps.length ? (
          <Button
            onClick={next}
            disabled={
              !allowNext(
                activeStep,
                customer,
                warehouse,
                products,
                store,
                address
              )
            }
            variant="contained"
            color="primary"
          >
            Next
          </Button>
        ) : (
          ""
        )}
      </Paper>
    </div>
  );
};

const mapState = () => ({});

const mapDispatch = dispatch => ({
  addOrder: order =>
    dispatch(
      apiPost("/api/order/add-order", order, ADDED_ORDER, ADD_ORDER_FAILED)
    )
});

export default connect(mapState, mapDispatch)(AddOrder);
