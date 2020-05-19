import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configCustomerTable,
  fetchCustomerList
} from "../../../actions/schedule";

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
import { formatTime } from "../../../util";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
    }
  },
  rowSelected: {
    cursor: "pointer",
    backgroundColor: "#afa",
    "&:hover": {
      backgroundColor: "#8f8"
    }
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const SelectCustomer = ({
  entries,
  count,
  config,
  selectedCustomer,
  fetchCustomer,
  configTable,
  onSelectCustomer
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCustomer();
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

  const rowClass = id =>
    id === (selectedCustomer && selectedCustomer.id)
      ? classes.rowSelected
      : classes.row;
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={sortedBy === "name"}
                  onClick={() => onSortChange("name")}
                  direction={sortOrder}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>
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
              <TableCell className={classes.tableHead}>Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow
                key={e.id}
                className={rowClass(e.id)}
                onClick={() => onSelectCustomer(e)}
              >
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>{e.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={count}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.schedule.customerMap,
  state => state.schedule.customerIdList,
  state => state.schedule.customerCount,
  state => state.schedule.customerTable,
  (customerMap, customerIdList, count, config) => ({
    entries: customerIdList
      .map(id => customerMap[id])
      .map(c => ({
        ...c,
        createdAt: formatTime(c.createdAt),
        updatedAt: formatTime(c.updatedAt)
      })),
    count,
    config
  })
);

const mapDispatch = dispatch => ({
  fetchCustomer: () => dispatch(fetchCustomerList()),
  configTable: config => dispatch(configCustomerTable(config))
});

export default connect(mapState, mapDispatch)(SelectCustomer);
