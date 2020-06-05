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
  withStyles,
  Typography,
  Box
} from "@material-ui/core";

import {
  fetchScheduleList,
  configScheduleTable
} from "../../../actions/schedule";
import { formatTime, zeroPad, formatDate } from "../../../util";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover
    }
  }
}))(TableRow);

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.info.light,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 14
  }
}))(TableCell);

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
      backgroundColor: "#ddd"
    }
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const ScheduleTable = ({
  entries,
  scheduleCount,
  config,
  fetchSchedule,
  configTable,
  onDelete,
  onSelect
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

  const onClickRow = id => {
    onSelect(id);
  };

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  return (
    <div>
      <Typography variant="h6">
        <Box fontWeight="fontWeightBold">Schedules Table</Box>
      </Typography>
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <StyledTableRow>
                <StyledTableCell className={classes.tableHead}>
                  Planning Code
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  From Date
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Thru Date
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Salesman Name
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Store Name
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Address
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Customer Name
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Config Code
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Repeat Week
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  Day List
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "createdAt"}
                    onClick={() => onSortChange("createdAt")}
                    direction={sortOrder}
                  >
                    Created At
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell className={classes.tableHead}>
                  <TableSortLabel
                    active={sortedBy === "updatedAt"}
                    onClick={() => onSortChange("updatedAt")}
                    direction={sortOrder}
                  >
                    Updated At
                  </TableSortLabel>
                </StyledTableCell>
                <StyledTableCell
                  className={classes.tableHead}
                ></StyledTableCell>
                <StyledTableCell
                  className={classes.tableHead}
                ></StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {entries.map(e => (
                <StyledTableRow key={e.id}>
                  <StyledTableCell>{e.planningCode}</StyledTableCell>
                  <StyledTableCell>{e.fromDate}</StyledTableCell>
                  <StyledTableCell>{e.thruDate}</StyledTableCell>
                  <StyledTableCell>{e.salesmanName}</StyledTableCell>
                  <StyledTableCell>{e.storeName}</StyledTableCell>
                  <StyledTableCell>{e.address}</StyledTableCell>
                  <StyledTableCell>{e.customerName}</StyledTableCell>
                  <StyledTableCell>{e.configCode}</StyledTableCell>
                  <StyledTableCell>{e.repeatWeek}</StyledTableCell>
                  <StyledTableCell>{e.dayList}</StyledTableCell>
                  <StyledTableCell>{e.createdAt}</StyledTableCell>
                  <StyledTableCell>{e.updatedAt}</StyledTableCell>
                  <StyledTableCell>
                    <DeleteIcon
                      className={classes.iconButton}
                      onClick={() => onDelete(e.id)}
                      color="secondary"
                    />
                  </StyledTableCell>
                  <StyledTableCell>
                    <MoreVertIcon
                      className={classes.iconButton}
                      onClick={() => onClickRow(e.id)}
                    />
                  </StyledTableCell>
                </StyledTableRow>
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
  state => state.schedule.scheduleMap,
  state => state.schedule.scheduleIdList,
  state => state.schedule.scheduleCount,
  state => state.schedule.scheduleTable,
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
    scheduleCount
  })
);

const mapDispatch = dispatch => ({
  fetchSchedule: () => dispatch(fetchScheduleList()),
  configTable: config => dispatch(configScheduleTable(config))
});

export default connect(mapState, mapDispatch)(ScheduleTable);
