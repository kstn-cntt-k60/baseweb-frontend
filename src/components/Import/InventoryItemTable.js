import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configInventoryItemTable,
  fetchInventoryItemListByWarehouse
} from "../../actions/import";

import {
  Paper,
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

import { formatTime } from "../../util";

const useStyles = makeStyles(theme => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  },
  paper: {
    marginTop: theme.spacing(1)
  },
  title: {
    margin: theme.spacing(1)
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const InventoryItemTable = ({
  warehouseId,
  entries,
  inventoryCount,
  config,
  fetchItems,
  configTable,
  onEdit
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchItems(warehouseId);
  }, [config]);

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

  return (
    <Paper className={classes.paper}>
      <h2 className={classes.title}>Import History</h2>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Product Name</TableCell>
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
  );
};

const mapState = createSelector(
  state => state.import.inventoryMap,
  state => state.import.inventoryIdList,
  state => state.import.inventoryCount,
  state => state.import.inventoryTable,
  (inventoryMap, inventoryIdList, inventoryCount, config) => ({
    config,
    entries: inventoryIdList
      .map(id => inventoryMap[id])
      .map(item => ({
        ...item,
        unitCost: `${item.unitCost}${item.currencyUomId}`,
        createdAt: formatTime(item.createdAt),
        updatedAt: formatTime(item.updatedAt)
      })),
    inventoryCount
  })
);

const mapDispatch = dispatch => ({
  fetchItems: id => dispatch(fetchInventoryItemListByWarehouse(id)),
  configTable: config => dispatch(configInventoryItemTable(config))
});

export default connect(mapState, mapDispatch)(InventoryItemTable);
