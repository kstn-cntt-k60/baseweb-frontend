import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { createSelector } from "reselect";

import { Paper, makeStyles } from "@material-ui/core";

import { apiGet, urlWithParams } from "../../../actions";
import { formatTime } from "../../../util";
import { GOT_SINGLE_ORDER } from "../../../actions/order";

import OrderItemTable from "./OrderItemTable";

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

  useEffect(() => {
    fetchOrder(orderId);
  }, []);

  return order ? (
    <div>
      <Paper className={classes.info}>
        <h4>To Customer: {order.customer}</h4>
        <h4>From Warehouse: {order.warehouse}</h4>
        <h4>Created By: {order.createdBy}</h4>
        <h4>To Address: {order.address}</h4>
        <h4>To Customer Store: {order.customerStore}</h4>
        <h4>Status: {order.status}</h4>
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
  fetchOrder: saleOrderId =>
    dispatch(
      apiGet(
        urlWithParams("/api/order/view-single-sale-order", { saleOrderId }),
        GOT_SINGLE_ORDER
      )
    )
});

export default connect(mapState, mapDispatch)(ViewOrder);
