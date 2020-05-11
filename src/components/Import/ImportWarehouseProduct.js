import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configProductInventoryItemTable,
  fetchProductInventoryItems
} from "../../actions/import";

import {
  Paper,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableSortLabel,
  TablePagination,
  makeStyles
} from "@material-ui/core";

import EditIcon from "@material-ui/icons/Edit";

import ProductInfoLink from "../Product/ProductInfoLink";
import AddInventoryItemDialog from "./AddInventoryItemDialog";

import { formatTime } from "../../util";

const useStyles = makeStyles(theme => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  },
  title: {
    margin: theme.spacing(1)
  },
  info: {
    padding: theme.spacing(1),
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const ImportWarehouseProduct = ({
  entries,
  inventoryCount,
  config,
  fetchItems,
  configTable,
  getWarehouse,
  onEdit
}) => {
  const classes = useStyles();

  const { warehouseId, productId } = useParams();
  const warehouse = getWarehouse(warehouseId);

  useEffect(() => {
    fetchItems(warehouseId, productId);
  }, [warehouseId, productId, config]);

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({ pageSize: e.target.value });
  };

  const onSortChange = name => {
    if (name === sortedBy) {
      configTable({ sortOrder: switchSortOrder(sortOrder) });
    } else {
      configTable({ sortedBy: name });
    }
  };

  const [openAdd, setOpenAdd] = useState(false);

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
        <Paper className={classes.info}></Paper>
      )}
      <Paper>
        <h2 className={classes.title}>Import History</h2>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenAdd(true)}
        >
          Add Inventory Item
        </Button>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  Product Name
                </TableCell>
                <TableCell className={classes.tableHead}>Quantity</TableCell>
                <TableCell className={classes.tableHead}>Cost</TableCell>
                <TableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "createdAt"}
                    onClick={() => onSortChange("createdAt")}
                    direction={sortOrder}
                  >
                    Created At
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "updatedAt"}
                    onClick={() => onSortChange("updatedAt")}
                    direction={sortOrder}
                  >
                    Updated At
                  </TableSortLabel>
                </TableCell>
                <TableCell className={classes.tableHead}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {entries.map(e => (
                <TableRow key={e.id}>
                  <TableCell>
                    <ProductInfoLink id={e.productId} name={e.productName} />
                  </TableCell>
                  <TableCell>{e.quantity}</TableCell>
                  <TableCell>{e.unitCost}</TableCell>
                  <TableCell>{e.createdAt}</TableCell>
                  <TableCell>{e.updatedAt}</TableCell>
                  <TableCell>
                    <EditIcon
                      className={classes.iconButton}
                      onClick={() => onEdit(e.id)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={inventoryCount}
          rowsPerPage={config.pageSize}
          page={config.page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
        />
      </Paper>

      <AddInventoryItemDialog
        open={openAdd}
        warehouseId={warehouseId}
        productId={parseInt(productId)}
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
  state => state.import.productInventoryMap,
  state => state.import.productInventoryIdList,
  state => state.import.productInventoryCount,
  state => state.import.productInventoryTable,
  state => state.import.warehouseMap,
  (inventoryMap, inventoryIdList, inventoryCount, config, warehouseMap) => ({
    config,
    entries: inventoryIdList
      .map(id => inventoryMap[id])
      .map(item => ({
        ...item,
        unitCost: `${item.unitCost}${item.currencyUomId}`,
        createdAt: formatTime(item.createdAt),
        updatedAt: formatTime(item.updatedAt)
      })),
    inventoryCount,
    getWarehouse: warehouseId => format(warehouseMap[warehouseId] || null)
  })
);

const mapDispatch = dispatch => ({
  fetchItems: (warehouseId, productId) =>
    dispatch(fetchProductInventoryItems(warehouseId, productId)),
  configTable: config => dispatch(configProductInventoryItemTable(config))
});

export default connect(mapState, mapDispatch)(ImportWarehouseProduct);
