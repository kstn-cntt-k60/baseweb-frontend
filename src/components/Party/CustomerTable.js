import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  customerConfigTable,
  fetchCustomerList,
  openEditCustomerDialog,
  DELETED_CUSTOMER
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
  makeStyles
} from "@material-ui/core";
import { formatTime } from "../../util";

import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const CustomerTable = ({
  entries,
  count,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  fetchCustomer,
  configTable,
  openEdit,
  openYesNoToDelete
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchCustomer();
  }, [page, pageSize, sortedBy, sortOrder]);

  const onPageChange = (_, newPage) => {
    configTable(newPage, pageSize, sortedBy, sortOrder);
  };

  const onPageSizeChange = e => {
    configTable(page, e.target.value, sortedBy, sortOrder);
  };

  const onSortChange = name => {
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

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={sortedBy === "name"}
                  onClick={() => onSortChange("name")}
                  direction={sortOrder}
                >
                  Customer Name
                </TableSortLabel>
              </TableCell>
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
              <TableCell className={classes.tableHead}>Description</TableCell>
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.createdAt}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>{e.description}</TableCell>
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
  state => state.account.customerMap,
  state => state.account.customerIdList,
  state => state.account.customerCount,
  state => state.account.customerPage,
  state => state.account.customerPageSize,
  state => state.account.customerSortedBy,
  state => state.account.customerSortOrder,
  (
    customerMap,
    customerIdList,
    count,
    page,
    pageSize,
    sortedBy,
    sortOrder
  ) => ({
    entries: customerIdList
      .map(id => customerMap[id])
      .map(c => ({
        ...c,
        createdAt: formatTime(c.createdAt),
        updatedAt: formatTime(c.updatedAt)
      })),
    count,
    page,
    pageSize,
    sortedBy,
    sortOrder
  })
);

const mapDispatch = dispatch => ({
  fetchCustomer: () => dispatch(fetchCustomerList()),
  configTable: (page, pageSize, sortedBy, sortOrder) =>
    dispatch(customerConfigTable(page, pageSize, sortedBy, sortOrder)),
  openEdit: id => dispatch(openEditCustomerDialog(id)),
  openYesNoToDelete: id =>
    dispatch(
      openYesNoDialog(
        "Do you want to delete this customer?",
        apiPost("/api/account/delete-customer", { id }, DELETED_CUSTOMER)
      )
    )
});

export default connect(mapState, mapDispatch)(CustomerTable);
