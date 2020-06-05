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
  fetchCheckinHistoryList,
  configChekinHistoryTable
} from "../../../actions/salesman";
import { formatTime, zeroPad, formatDate } from "../../../util";

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
  },
  marginDiv: {
    marginTop: "15px",
    marginBottom: "15px"
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const CheckingHistory = ({
  entries,
  checkinCount,
  config,
  fetchCheckinHistory,
  configTable
}) => {
  const classes = useStyles({ focus });

  useEffect(() => {
    fetchCheckinHistory();
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

  return (
    <React.Fragment>
      <div className={classes.marginDiv}>
        <Typography variant="h6">
          <Box fontWeight="fontWeightBold">Salesman Checking History Table</Box>
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
                    Config Code
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
                    <TableSortLabel
                      active={sortedBy === "checkinTime"}
                      onClick={() => onSortChange("checkinTime")}
                      direction={sortOrder}
                    >
                      Checkin Time
                    </TableSortLabel>
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {entries.map(e => (
                  <StyledTableRow key={e.id}>
                    <StyledTableCell>{e.planningCode}</StyledTableCell>
                    <StyledTableCell>{e.fromDate}</StyledTableCell>
                    <StyledTableCell>{e.thruDate}</StyledTableCell>
                    <StyledTableCell>{e.configCode}</StyledTableCell>
                    <StyledTableCell>{e.storeName}</StyledTableCell>
                    <StyledTableCell>{e.address}</StyledTableCell>
                    <StyledTableCell>{e.customerName}</StyledTableCell>
                    <StyledTableCell>{e.checkinTime}</StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={checkinCount}
            rowsPerPage={config.pageSize}
            page={config.page}
            onChangePage={onPageChange}
            onChangeRowsPerPage={onPageSizeChange}
          />
        </Paper>
      </div>
    </React.Fragment>
  );
};

const mapState = createSelector(
  state => state.salesman.checkinMap,
  state => state.salesman.checkinIdList,
  state => state.salesman.checkinCount,
  state => state.salesman.checkinTable,
  (checkinMap, checkinIdList, checkinCount, config) => ({
    config,
    entries: checkinIdList
      .map(id => checkinMap[id])
      .map(w => ({
        ...w,
        planningCode: zeroPad(w.planningId, 5),
        configCode: zeroPad(w.configId, 5),
        checkinTime: formatTime(w.checkinTime),
        fromDate: formatDate(w.fromDate),
        thruDate: formatDate(w.thruDate)
      })),
    checkinCount
  })
);

const mapDispatch = dispatch => ({
  fetchCheckinHistory: () => dispatch(fetchCheckinHistoryList()),
  configTable: config => dispatch(configChekinHistoryTable(config))
});

export default connect(mapState, mapDispatch)(CheckingHistory);
