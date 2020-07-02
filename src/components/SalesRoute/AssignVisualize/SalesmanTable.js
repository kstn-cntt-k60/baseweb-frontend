import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  fetchSalesmanList,
  configSalesmanTable
} from "../../../actions/salesroute";

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
import PersonPinCircleIcon from "@material-ui/icons/PersonPinCircle";

import { formatTime } from "../../../util";

const useStyles = makeStyles(theme => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
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
  },
  tableSize: {
    width: "500px"
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const SalesmanTable = ({
  entries,
  salesmanCount,
  config,
  fetchSalesman,
  configTable,
  onClickSelect
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchSalesman();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({ pageSize: e.target.value });
  };

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  const onSortChange = name => {
    if (name === sortedBy) {
      configTable({ sortOrder: switchSortOrder(sortOrder) });
    } else {
      configTable({ sortedBy: name });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    configTable({ searchText: text });
  };

  return (
    <Paper className={classes.tableSize}>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search Salesman ..."
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
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={text === "" && sortedBy === "username"}
                  onClick={() => onSortChange("username")}
                  direction={sortOrder}
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Created By</TableCell>

              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.username}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
                <TableCell>
                  <PersonPinCircleIcon
                    color="primary"
                    className={classes.iconButton}
                    onClick={() => onClickSelect(e.id)}
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
  state => state.salesroute.salesmanMap,
  state => state.salesroute.salesmanIdList,
  state => state.salesroute.salesmanCount,
  state => state.salesroute.salesmanTable,
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

export default connect(mapState, mapDispatch)(SalesmanTable);
