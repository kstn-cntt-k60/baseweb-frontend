import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { useHistory } from "react-router-dom";

import {
  configExportableOrderTable,
  fetchExportableOrderList
} from "../../actions/export";

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

import { formatTime } from "../../util";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
    }
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

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

const ExportableOrderTable = ({
  entries,
  orderCount,
  config,
  fetchOrder,
  configTable
}) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    fetchOrder();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({ pageSize: e.target.value });
  };

  const onSortChange = name => {
    if (name === config.sortedBy) {
      configTable({ sortOrder: switchSortOrder(config.sortOrder) });
    } else {
      configTable({ sortedBy: name });
    }
  };

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  const onSelectRow = id => {
    history.push(`/import-export/export-order-item/${id}`);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>To Customer</TableCell>
              <TableCell className={classes.tableHead}>
                From Warehouse
              </TableCell>
              <TableCell className={classes.tableHead}>Created By</TableCell>
              <TableCell className={classes.tableHead}>To Address</TableCell>
              <TableCell className={classes.tableHead}>
                To Customer Store
              </TableCell>
              <TableCell className={classes.tableHead}>Status</TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow
                key={e.id}
                className={classes.row}
                onClick={() => onSelectRow(e.id)}
              >
                <TableCell>{e.customer}</TableCell>
                <TableCell>{e.warehouse}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.customerStore}</TableCell>
                <TableCell>{e.status}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={orderCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.export.exportableOrderMap,
  state => state.export.exportableOrderIdList,
  state => state.export.exportableOrderCount,
  state => state.export.exportableOrderTable,
  (orderMap, orderIdList, orderCount, config) => ({
    entries: orderIdList
      .map(id => orderMap[id])
      .map(o => ({
        ...o,
        status: statusFromStatusId(o.statusId),
        createdAt: formatTime(o.createdAt),
        updatedAt: formatTime(o.updatedAt)
      })),
    orderCount,
    config
  })
);

const mapDispatch = dispatch => ({
  fetchOrder: () => dispatch(fetchExportableOrderList()),
  configTable: config => dispatch(configExportableOrderTable(config))
});

export default connect(mapState, mapDispatch)(ExportableOrderTable);
