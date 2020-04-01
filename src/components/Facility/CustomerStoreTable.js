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
  fetchCustomerStoreList,
  configCustomerStoreTable
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
    borderWidth: focus ? "2px" : "1px",
    borderColor: focus ? "blue" : "#aaa",
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

const CustomerStoreTable = ({
  entries,
  storeCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText,
  onEdit,
  onDelete,
  fetchCustomerStoreList,
  configTable
}) => {
  const [text, setText] = useState(searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchCustomerStoreList();
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
            placeholder="Search Customer Store ..."
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
                  Store Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Address</TableCell>
              <TableCell className={classes.tableHead}>Customer Name</TableCell>
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
                <TableCell>{e.customer}</TableCell>
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
        count={storeCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.facility.storeMap,
  state => state.facility.storeIdList,
  state => state.facility.storeCount,
  state => state.facility.storePage,
  state => state.facility.storePageSize,
  state => state.facility.storeSortedBy,
  state => state.facility.storeSortOrder,
  state => state.facility.storeSearchText,
  (
    storeMap,
    storeIdList,
    storeCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  ) => ({
    entries: storeIdList
      .map(id => storeMap[id])
      .map(w => ({
        ...w,
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    storeCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  })
);

const mapDispatch = dispatch => ({
  fetchCustomerStoreList: () => dispatch(fetchCustomerStoreList()),
  configTable: (page, pageSize, sortedBy, sortOrder, searchText) =>
    dispatch(
      configCustomerStoreTable(page, pageSize, sortedBy, sortOrder, searchText)
    )
});

export default connect(mapState, mapDispatch)(CustomerStoreTable);
