import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configSalesmanTable,
  fetchSalesmanList
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

const SelectSalesman = ({
  entries,
  salesmanCount,
  config,
  selectedSalesman,
  fetchSalesman,
  configTable,
  onSelectSalesman
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchSalesman();
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
    id === (selectedSalesman && selectedSalesman.id)
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
                  active={sortedBy === "username"}
                  onClick={() => onSortChange("username")}
                  direction={sortOrder}
                >
                  Salesman Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Created By</TableCell>
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
                className={rowClass(e.id)}
                onClick={() => onSelectSalesman(e)}
              >
                <TableCell>{e.salesmanName}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
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
        count={salesmanCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.schedule.salesmanMap,
  state => state.schedule.salesmanIdList,
  state => state.schedule.salesmanCount,
  state => state.schedule.salesmanTable,
  (salesmanMap, salesmanIdList, salesmanCount, config) => ({
    entries: salesmanIdList
      .map(id => salesmanMap[id])
      .map(p => ({
        ...p,
        createdAt: formatTime(p.createdAt),
        updatedAt: formatTime(p.updatedAt)
      })),
    salesmanCount,
    config
  })
);

const mapDispatch = dispatch => ({
  fetchSalesman: () => dispatch(fetchSalesmanList()),
  configTable: config => dispatch(configSalesmanTable(config))
});

export default connect(mapState, mapDispatch)(SelectSalesman);
