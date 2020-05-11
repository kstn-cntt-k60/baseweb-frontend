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

import { fetchWarehouseList, configWarehouseTable } from "../../actions/import";
import { formatTime } from "../../util";

const useStyles = makeStyles(theme => ({
  tableHead: {
    fontWeight: "bold"
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

const WarehouseTable = ({
  entries,
  warehouseCount,
  config,
  fetchWarehouseList,
  configTable,
  onSelect
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchWarehouseList();
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
            placeholder="Search Warehouse ..."
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
                  active={text === "" && sortedBy === "name"}
                  onClick={() => onSortChange("name")}
                  direction={sortOrder}
                >
                  Warehouse Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Address</TableCell>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow
                key={e.id}
                className={classes.row}
                onClick={() => onClickRow(e.id)}
              >
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.address}</TableCell>
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
        count={warehouseCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.import.warehouseMap,
  state => state.import.warehouseIdList,
  state => state.import.warehouseCount,
  state => state.import.warehouseTable,
  (warehouseMap, warehouseIdList, warehouseCount, config) => ({
    config,
    entries: warehouseIdList
      .map(id => warehouseMap[id])
      .map(w => ({
        ...w,
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    warehouseCount
  })
);

const mapDispatch = dispatch => ({
  fetchWarehouseList: () => dispatch(fetchWarehouseList()),
  configTable: config => dispatch(configWarehouseTable(config))
});

export default connect(mapState, mapDispatch)(WarehouseTable);
