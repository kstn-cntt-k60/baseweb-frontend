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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SearchIcon from "@material-ui/icons/Search";

import {
  fetchWarehouseList,
  configWarehouseTable
} from "../../actions/facility";
import { formatTime } from "../../util";

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
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const WarehouseTable = ({
  entries,
  warehouseCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText,
  onEdit,
  onDelete,
  fetchWarehouseList,
  configTable
}) => {
  const [text, setText] = useState(searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchWarehouseList();
  }, [page, pageSize, sortedBy, sortOrder, searchText]);

  const onPageChange = (_, newPage) => {
    configTable(newPage, pageSize, sortedBy, sortOrder, text);
  };

  const onPageSizeChange = e => {
    configTable(page, e.target.value, sortedBy, sortOrder, text);
  };

  const onSortChange = name => {
    if (name === sortedBy) {
      configTable(page, pageSize, sortedBy, switchSortOrder(sortOrder), text);
    } else {
      configTable(page, pageSize, name, sortOrder, text);
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    configTable(page, pageSize, sortedBy, sortOrder, text);
  };

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
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.address}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>
                  <EditIcon
                    className={classes.iconButton}
                    onClick={() => onEdit(e.id)}
                  />
                </TableCell>
                <TableCell>
                  <DeleteIcon
                    className={classes.iconButton}
                    onClick={() => onDelete(e.id)}
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
        count={warehouseCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.facility.warehouseMap,
  state => state.facility.warehouseIdList,
  state => state.facility.warehouseCount,
  state => state.facility.warehousePage,
  state => state.facility.warehousePageSize,
  state => state.facility.warehouseSortedBy,
  state => state.facility.warehouseSortOrder,
  state => state.facility.warehouseSearchText,
  (
    warehouseMap,
    warehouseIdList,
    warehouseCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  ) => ({
    entries: warehouseIdList
      .map(id => warehouseMap[id])
      .map(w => ({
        ...w,
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    warehouseCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  })
);

const mapDispatch = dispatch => ({
  fetchWarehouseList: () => dispatch(fetchWarehouseList()),
  configTable: (page, pageSize, sortedBy, sortOrder, searchText) =>
    dispatch(
      configWarehouseTable(page, pageSize, sortedBy, sortOrder, searchText)
    )
});

export default connect(mapState, mapDispatch)(WarehouseTable);
