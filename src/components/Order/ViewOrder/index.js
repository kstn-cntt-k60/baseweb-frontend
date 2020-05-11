import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";

import { Button, Paper, makeStyles } from "@material-ui/core";

import { formatTime } from "../../../util";
import { fetchSingleOrder } from "../../../actions/order";

import OrderItemTable from "./OrderItemTable";
import AcceptDialog from "./AcceptDialog";
import CancelDialog from "./CancelDialog";

const useStyles = makeStyles(theme => ({
  info: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    marginBottom: theme.spacing(1)
  },
  total: {
    marginLeft: theme.spacing(2),
    color: "#888"
  },
  status: {
    color: "red"
  },
  accept: {
    marginLeft: theme.spacing(1)
  }
}));

const statusFromStatusId = statusId => {
  switch (statusId) {
    case 1:
      return "Created";
    case 2:
      return "Accepted";
    case 3:
      return "Shipping";
    case 4:
      return "Completed";
    case 5:
      return "Canceled";
  }
};

const ViewOrder = ({ order, items, totalPrices, fetchOrder }) => {
  const classes = useStyles();
  const { orderId } = useParams();

  const [openAccept, setOpenAccept] = useState(false);
  const [openCancel, setOpenCancel] = useState(false);

  useEffect(() => {
    fetchOrder(orderId);
  }, [orderId]);

  return order ? (
    <div>
      <Paper className={classes.info}>
        <h4>To Customer: {order.customer}</h4>
        <h4>From Warehouse: {order.warehouse}</h4>
        <h4>Created By: {order.createdBy}</h4>
        <h4>To Address: {order.address}</h4>
        <h4>To Customer Store: {order.customerStore}</h4>
        <h4>
          Status: <span className={classes.status}>{order.status}</span>
          {order.statusId === 1 ? (
            <React.Fragment>
              <Button
                variant="contained"
                color="primary"
                className={classes.accept}
                onClick={() => setOpenAccept(true)}
              >
                Accept
              </Button>
              <Button
                variant="contained"
                color="secondary"
                className={classes.accept}
                onClick={() => setOpenCancel(true)}
              >
                Cancel
              </Button>
            </React.Fragment>
          ) : (
            ""
          )}
        </h4>
        <h4>Created At: {order.createdAt}</h4>
        <h4>Updated At: {order.updatedAt}</h4>
        <h4>
          Total Price:
          {Object.entries(totalPrices).map(([currency, value]) => (
            <div key={currency} className={classes.total}>
              {currency}: {value}
            </div>
          ))}
        </h4>
      </Paper>
      <OrderItemTable items={items} />
      <AcceptDialog
        open={openAccept}
        onClose={() => setOpenAccept(false)}
        orderId={orderId}
      />
      <CancelDialog
        open={openCancel}
        onClose={() => setOpenCancel(false)}
        orderId={orderId}
      />
    </div>
  ) : (
    <div></div>
  );
};

const computeTotalPrices = items => {
  const result = {};

  items.forEach(item => {
    const prev = result[item.currencyUomId] || 0;
    result[item.currencyUomId] = prev + parseFloat(item.quantity) * item.price;
  });

  return result;
};

const mapState = createSelector(
  state => state.order.view.currentOrder,
  state => state.order.view.orderItems,
  (order, items) => ({
    order: order && {
      ...order,
      status: statusFromStatusId(order.statusId),
      createdAt: formatTime(order.createdAt),
      updatedAt: formatTime(order.updatedAt)
    },
    items,
    totalPrices: computeTotalPrices(items)
  })
);

const mapDispatch = dispatch => ({
  fetchOrder: saleOrderId => dispatch(fetchSingleOrder(saleOrderId))
});

export default connect(mapState, mapDispatch)(ViewOrder);
