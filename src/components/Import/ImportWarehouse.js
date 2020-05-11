import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { formatTime } from "../../util";
import { apiGet } from "../../actions";
import { GOT_WAREHOUSE } from "../../actions/import";

import { makeStyles } from "@material-ui/core";

import { Paper } from "@material-ui/core";
import ProductTable from "./ProductTable";
import InventoryItemTable from "./InventoryItemTable";
import AddInventoryItemDialog from "./AddInventoryItemDialog";

const useStyles = makeStyles(theme => ({
  info: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const ImportWarehouse = ({ getWarehouse, apiGetWarehouse }) => {
  const classes = useStyles();

  const { id } = useParams();
  const history = useHistory();

  const [productId, setProductId] = useState(null);
  const [openAdd, setOpenAdd] = useState(false);

  const warehouse = getWarehouse(id);
  if (warehouse === null) {
    apiGetWarehouse(id);
  }

  const onAddItem = productId => {
    setProductId(productId);
    setOpenAdd(true);
  };

  const onMoreInfo = productId => {
    history.push(`/import-export/import-warehouse-product/${id}/${productId}`);
  };

  return (
    <div>
      {warehouse ? (
        <Paper className={classes.info}>
          <h3>Warehouse Name: {warehouse.name}</h3>
          <h3>Address: {warehouse.address}</h3>
          <h3>Created At: {warehouse.createdAt}</h3>
          <h3>Updated At: {warehouse.updatedAt}</h3>
        </Paper>
      ) : (
        <Paper></Paper>
      )}

      <ProductTable
        warehouseId={id}
        onAddItem={onAddItem}
        onMoreInfo={onMoreInfo}
      />
      <InventoryItemTable warehouseId={id} />

      <AddInventoryItemDialog
        open={openAdd}
        warehouseId={id}
        productId={productId}
        onClose={() => setOpenAdd(false)}
      />
    </div>
  );
};

const format = w => {
  if (w === null) return null;

  return {
    ...w,
    createdAt: formatTime(w.createdAt),
    updatedAt: formatTime(w.updatedAt)
  };
};

const mapState = createSelector(
  state => state.import.warehouseMap,
  warehouseMap => ({
    getWarehouse: id => format(warehouseMap[id] || null)
  })
);

const mapDispatch = dispatch => ({
  apiGetWarehouse: id =>
    dispatch(apiGet(`/api/facility/get-warehouse/${id}`, GOT_WAREHOUSE))
});

export default connect(mapState, mapDispatch)(ImportWarehouse);
