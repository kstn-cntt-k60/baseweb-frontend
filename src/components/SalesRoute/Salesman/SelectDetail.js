import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

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
  makeStyles,
  Typography,
  Box
} from "@material-ui/core";

import {
  fetchScheduleList,
  configScheduleTable
} from "../../../actions/salesman";
import { formatTime, zeroPad, formatDate } from "../../../util";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
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

const SelectDetail = ({
  entries,
  scheduleCount,
  config,
  fetchSchedule,
  configTable,
  onSelectDetail,
  selectedDetail,
  salesmanName
}) => {
  const classes = useStyles({ focus });

  useEffect(() => {
    fetchSchedule();
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
    id === (selectedDetail && selectedDetail.id)
      ? classes.rowSelected
      : classes.row;

  return (
    <div>
      <Typography variant="h6">
        <Box fontWeight="fontWeightBold">
          Salesman User Login: {salesmanName}
        </Box>
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell className={classes.tableHead}>
                  Planning Code
                </TableCell>
                <TableCell className={classes.tableHead}>From Date</TableCell>
                <TableCell className={classes.tableHead}>Thru Date</TableCell>
                <TableCell className={classes.tableHead}>
                  Customer Name
                </TableCell>
                <TableCell className={classes.tableHead}>Config Code</TableCell>
                <TableCell className={classes.tableHead}>Repeat Week</TableCell>
                <TableCell className={classes.tableHead}>Day List</TableCell>
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
                <TableRow
                  key={e.id}
                  className={rowClass(e.id)}
                  onClick={() => onSelectDetail(e)}
                >
                  <TableCell>{e.planningCode}</TableCell>
                  <TableCell>{e.fromDate}</TableCell>
                  <TableCell>{e.thruDate}</TableCell>
                  <TableCell>{e.customerName}</TableCell>
                  <TableCell>{e.configCode}</TableCell>
                  <TableCell>{e.repeatWeek}</TableCell>
                  <TableCell>{e.dayList}</TableCell>
                  <TableCell>{e.createdAt}</TableCell>
                  <TableCell>{e.updatedAt}</TableCell>

                  <TableCell>
                    <MoreVertIcon className={classes.iconButton} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={scheduleCount}
          rowsPerPage={config.pageSize}
          page={config.page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
        />
      </Paper>
    </div>
  );
};

const mapState = createSelector(
  state => state.salesman.scheduleMap,
  state => state.salesman.scheduleIdList,
  state => state.salesman.scheduleCount,
  state => state.salesman.scheduleTable,
  (scheduleMap, scheduleIdList, scheduleCount, config) => ({
    config,
    entries: scheduleIdList
      .map(id => scheduleMap[id])
      .map(w => ({
        ...w,
        displayId: zeroPad(w.id, 5),
        planningCode: zeroPad(w.planningId, 5),
        configCode: zeroPad(w.configId, 5),
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt),
        fromDate: formatDate(w.fromDate),
        thruDate: formatDate(w.thruDate)
      })),
    scheduleCount,
    salesmanName: Object.values(scheduleMap)[0]
      ? Object.values(scheduleMap)[0].salesmanName.toUpperCase()
      : ""
  })
);

const mapDispatch = dispatch => ({
  fetchSchedule: () => dispatch(fetchScheduleList()),
  configTable: config => dispatch(configScheduleTable(config))
});

export default connect(mapState, mapDispatch)(SelectDetail);
