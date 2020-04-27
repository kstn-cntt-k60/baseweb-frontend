import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  Button,
  Paper,
  List,
  ListItem,
  Divider,
  ListItemText,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(1)
  },
  title: {
    ...theme.typography.subtitle1
  },
  more: {
    ...theme.typography.subtitle2,
    color: "rgba(0, 0, 0, 0.54)",
    paddingLeft: theme.spacing(2)
  },
  shipTo: {
    ...theme.typography.subtitle1,
    paddingLeft: theme.spacing(2)
  },
  paper: {
    marginBottom: theme.spacing(1)
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  }
}));

const FinalStep = ({
  customer,
  warehouse,
  products,
  store,
  address,
  onCancel,
  onAdd,
  addedSequence,
  addFailedSequence
}) => {
  const classes = useStyles();
  const [state, setState] = useState("INIT");

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
      onCancel();
    }
  }, [addedSequence]);

  useEffect(() => {
    if (state !== "INIT") {
      setState("INIT");
    }
  }, [addFailedSequence]);

  const onAddOrder = () => {
    setState("ADDING");
    onAdd();
  };

  const onClickCancel = () => {
    setState("INIT");
    onCancel();
  };

  return (
    <div>
      <Paper className={classes.paper}>
        <div className={classes.info}>
          <div className={classes.title}>To Customer: {customer.name}</div>
          <div className={classes.more}>Created At: {customer.createdAt}</div>
          <div className={classes.more}>Updated At: {customer.updatedAt}</div>
          <div className={classes.more}>
            Description: {customer.description}
          </div>
        </div>
        <Divider />
        <div className={classes.info}>
          <div className={classes.title}>From Warehouse: {warehouse.name}</div>
          <div className={classes.more}>Address: {warehouse.address}</div>
          <div className={classes.more}>Created At: {warehouse.createdAt}</div>
          <div className={classes.more}>Updated At: {warehouse.updatedAt}</div>
        </div>
        <Divider />
        <div className={classes.info}>
          <div className={classes.title}>Ship to:</div>
          {store !== null ? (
            <div className={classes.shipTo}>
              Customer Store: {store.name}
              <div className={classes.more}>Store Address: {store.address}</div>
            </div>
          ) : (
            ""
          )}
          {address !== "" ? (
            <div className={classes.shipTo}>Address: {address}</div>
          ) : (
            ""
          )}
        </div>
      </Paper>

      <Paper className={classes.paper}>
        <List>
          {products.map((p, index) => (
            <React.Fragment key={index}>
              {index === 0 ? "" : <Divider component="li" />}
              <ListItem>
                <ListItemText
                  primary={p.name}
                  secondary={
                    <React.Fragment>
                      <span>Quantity: {p.quantity}</span>
                      <br />
                      <span>Unit: {p.unitUomId}</span>
                      <br />
                      <span>Weight: {p.weight}</span>
                    </React.Fragment>
                  }
                />
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>

      <div className={classes.buttons}>
        <Button variant="contained" color="secondary" onClick={onClickCancel}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          disabled={state !== "INIT"}
          onClick={onAddOrder}
        >
          Add Order
        </Button>
      </div>
    </div>
  );
};

const mapState = state => ({
  addedSequence: state.order.add.addedOrderSequence,
  addFailedSequence: state.order.add.addOrderFailedSequence
});

export default connect(mapState)(FinalStep);
