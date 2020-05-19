import React, { useState, useEffect } from "react";
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
  makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import {
  fetchPlanningList,
  configPlanningTable
} from "../../actions/salesroute";
import { formatTime, formatDate, zeroPad } from "../../util";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const useStyles = makeStyles(theme => ({
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
  search: ({ focus }) => ({
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    border: "solid",
    borderWidth: "1px",
    borderColor: focus ? "blue" : "#aaa",
    boxShadow: focus ? "0 0 10px 0px blue" : "none",
    marginTop: theme.spacing(1),
    width: 500,
    borderRadius: "15px",
    padding: "0px 10px"
  }),
  searchInput: {
    outline: "none",
    width: "100%",
    border: "none",
    height: "35px",
    fontSize: theme.typography.htmlFontSize
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const PlanningTable = ({
  entries,
  planningCount,
  config,
  fetchPlanningList,
  configTable,
  onSelect,
  onEdit,
  onDelete
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchPlanningList();
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

  const onSubmit = e => {
    e.preventDefault();
    configTable({ searchText: text });
  };

  const onClickRow = id => {
    onSelect(id);
  };

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  return (
    <Paper>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search Planning Period ..."
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      </form>
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
                  active={text === "" && sortedBy === "createdAt"}
                  onClick={() => onSortChange("createdAt")}
                  direction={sortOrder}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={text === "" && sortedBy === "updatedAt"}
                  onClick={() => onSortChange("updatedAt")}
                  direction={sortOrder}
                >
                  Updated At
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.displayId}</TableCell>
                <TableCell>{e.fromDate}</TableCell>
                <TableCell>{e.thruDate}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>
                  <EditIcon
                    className={classes.iconButton}
                    onClick={() => onEdit(e.id)}
                    color="secondary"
                  />
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    className={classes.iconButton}
                    onClick={() => onDelete(e.id)}
                    color="primary"
                  />
                </TableCell>
                <TableCell>
                  <MoreVertIcon
                    className={classes.iconButton}
                    onClick={() => onClickRow(e.id)}
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
  state => state.salesroute.planningMap,
  state => state.salesroute.planningIdList,
  state => state.salesroute.planningCount,
  state => state.salesroute.planningTable,
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
  fetchPlanningList: () => dispatch(fetchPlanningList()),
  configTable: config => dispatch(configPlanningTable(config))
});

export default connect(mapState, mapDispatch)(PlanningTable);
