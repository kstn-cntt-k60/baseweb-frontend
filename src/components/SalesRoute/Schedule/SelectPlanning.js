import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configPlanningTable,
  fetchPlanningList
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
import { formatTime, zeroPad, formatDate } from "../../../util";

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

const SelectPlanning = ({
  entries,
  planningCount,
  config,
  selectedPlanning,
  fetchPlanning,
  configTable,
  onSelectPlanning
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPlanning();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({
      pageSize: e.target.value
    });
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
    id === (selectedPlanning && selectedPlanning.id)
      ? classes.rowSelected
      : classes.row;
  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Planning Code</TableCell>
              <TableCell className={classes.tableHead}>From Date</TableCell>
              <TableCell className={classes.tableHead}>Thru Date</TableCell>
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
                onClick={() => onSelectPlanning(e)}
              >
                <TableCell>{e.displayId}</TableCell>
                <TableCell>{e.fromDate}</TableCell>
                <TableCell>{e.thruDate}</TableCell>
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
        count={planningCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.schedule.planningMap,
  state => state.schedule.planningIdList,
  state => state.schedule.planningCount,
  state => state.schedule.planningTable,
  (planningMap, planningIdList, planningCount, config) => ({
    config,
    entries: planningIdList
      .map(id => planningMap[id])
      .map(w => ({
        ...w,
        displayId: zeroPad(w.id, 5),
        fromDate: formatDate(w.fromDate),
        thruDate: formatDate(w.thruDate),
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    planningCount
  })
);

const mapDispatch = dispatch => ({
  fetchPlanning: () => dispatch(fetchPlanningList()),
  configTable: config => dispatch(configPlanningTable(config))
});

export default connect(mapState, mapDispatch)(SelectPlanning);
