import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  userLoginConfigTable,
  fetchUserLoginList,
  openEditCustomerDialog,
  DELETED_CUSTOMER,
  userLoginSearchText
} from "../../actions/account";
import { apiPost, openYesNoDialog } from "../../actions";

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
  Divider,
  makeStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { formatTime, formatDate, getGender } from "../../util";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const UserLoginTable = ({
  entries,
  count,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText,
  fetchUserLogin,
  configTable,
  openEdit,
  openYesNoToDelete,
  setSearchText
}) => {
  const [text, setText] = useState(searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchUserLogin();
  }, [page, pageSize, sortedBy, sortOrder, searchText]);

  const onPageChange = (_, newPage) => {
    configTable(newPage, pageSize, sortedBy, sortOrder);
  };

  const onPageSizeChange = e => {
    configTable(page, e.target.value, sortedBy, sortOrder);
  };

  const onSortChange = name => {
    if (searchText !== "") return;
    if (name === sortedBy) {
      configTable(page, pageSize, sortedBy, switchSortOrder(sortOrder));
    } else {
      configTable(page, pageSize, name, sortOrder);
    }
  };

  const onEdit = id => {
    openEdit(id);
  };

  const onDelete = id => {
    openYesNoToDelete(id);
  };

  const onSubmit = e => {
    e.preventDefault();
    setSearchText(text);
  };

  return (
    <Paper>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search User Login ..."
            type="text"
            value={text}
            onChange={e => setText(e.target.value)}
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        </div>
      </form>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={searchText === "" && sortedBy === "username"}
                  onClick={() => onSortChange("username")}
                  direction={sortOrder}
                >
                  Username
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={searchText === "" && sortedBy === "createdAt"}
                  onClick={() => onSortChange("createdAt")}
                  direction={sortOrder}
                >
                  Created At
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={searchText === "" && sortedBy === "updatedAt"}
                  onClick={() => onSortChange("updatedAt")}
                  direction={sortOrder}
                >
                  Updated At
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Full Name</TableCell>
              <TableCell className={classes.tableHead}>Birth Date</TableCell>
              <TableCell className={classes.tableHead}>Gender</TableCell>
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.username}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>{e.fullName}</TableCell>
                <TableCell>{e.birthDate}</TableCell>
                <TableCell>{e.gender}</TableCell>
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
        count={count}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.account.userLoginMap,
  state => state.account.userLoginIdList,
  state => state.account.userLoginCount,
  state => state.account.userLoginPage,
  state => state.account.userLoginPageSize,
  state => state.account.userLoginSortedBy,
  state => state.account.userLoginSortOrder,
  state => state.account.userLoginSearchText,
  (
    userLoginMap,
    userLoginIdList,
    count,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  ) => ({
    entries: userLoginIdList
      .map(id => userLoginMap[id])
      .map(u => ({
        ...u,
        createdAt: formatTime(u.createdAt),
        updatedAt: formatTime(u.updatedAt),
        birthDate: formatDate(u.birthDate),
        fullName: `${u.lastName} ${u.middleName} ${u.firstName}`,
        gender: getGender(u.genderId)
      })),
    count,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  })
);

const mapDispatch = dispatch => ({
  fetchUserLogin: () => dispatch(fetchUserLoginList()),
  configTable: (page, pageSize, sortedBy, sortOrder) =>
    dispatch(userLoginConfigTable(page, pageSize, sortedBy, sortOrder)),
  openEdit: id => dispatch(openEditCustomerDialog(id)),
  openYesNoToDelete: id =>
    dispatch(
      openYesNoDialog(
        "Do you want to delete this customer?",
        apiPost("/api/account/delete-customer", { id }, DELETED_CUSTOMER)
      )
    ),
  setSearchText: text => dispatch(userLoginSearchText(text))
});

export default connect(mapState, mapDispatch)(UserLoginTable);
