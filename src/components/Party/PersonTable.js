import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  personConfigTable,
  fetchPersonList,
  openEditPersonDialog,
  DELETED_PERSON
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
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { getGender, formatTime, formatDate } from "../../util";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const PersonTable = ({
  entries,
  personCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  fetchPersonList,
  configTable,
  openEditDialog,
  openYesNoToDelete
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPersonList();
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
    openEditDialog(id);
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
                  active={sortedBy === "firstName"}
                  onClick={() => onSortChange("firstName")}
                  direction={sortOrder}
                >
                  First Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Middle Name</TableCell>
              <TableCell className={classes.tableHead}>Last Name</TableCell>
              <TableCell className={classes.tableHead}>Gender</TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={sortedBy === "birthDate"}
                  onClick={() => onSortChange("birthDate")}
                  direction={sortOrder}
                >
                  Birth Date
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
                <TableCell>{e.firstName}</TableCell>
                <TableCell>{e.middleName}</TableCell>
                <TableCell>{e.lastName}</TableCell>
                <TableCell>{e.gender}</TableCell>
                <TableCell>{e.birthDate}</TableCell>
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
        count={personCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.account.personMap,
  state => state.account.personIdList,
  state => state.account.personCount,
  state => state.account.personPage,
  state => state.account.personPageSize,
  state => state.account.personSortedBy,
  state => state.account.personSortOrder,
  (
    personMap,
    personIdList,
    personCount,
    page,
    pageSize,
    sortedBy,
    sortOrder
  ) => ({
    entries: personIdList
      .map(id => personMap[id])
      .map(p => ({
        ...p,
        gender: getGender(p.genderId),
        birthDate: formatDate(p.birthDate),
        createdAt: formatTime(p.createdAt),
        updatedAt: formatTime(p.updatedAt)
      })),
    personCount,
    page,
    pageSize,
    sortedBy,
    sortOrder
  })
);

const mapDispatch = dispatch => ({
  fetchPersonList: () => dispatch(fetchPersonList()),
  configTable: (page, pageSize, sortedBy, sortOrder) =>
    dispatch(personConfigTable(page, pageSize, sortedBy, sortOrder)),
  openEditDialog: id => dispatch(openEditPersonDialog(id)),
  openYesNoToDelete: id =>
    dispatch(
      openYesNoDialog(
        "Do you want to delete this person?",
        apiPost("/api/account/delete-person", { id }, DELETED_PERSON)
      )
    )
});

export default connect(mapState, mapDispatch)(PersonTable);
