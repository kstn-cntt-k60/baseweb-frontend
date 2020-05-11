import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import { configPersonTable, fetchPersonList } from "../../actions/account";

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

import { getGender, formatTime, formatDate } from "../../util";

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
    boxShadow: focus ? "0 0 10px 0 blue" : "none",
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

const PersonTable = ({
  entries,
  personCount,
  config,
  fetchPerson,
  configTable,
  onEdit,
  onDelete
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchPerson();
  }, [config]);

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({ pageSize: e.target.value });
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

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  return (
    <Paper>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search Person ..."
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
        rowsPerPage={config.pageSize}
        page={config.page}
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
  state => state.account.personTable,
  (personMap, personIdList, personCount, config) => ({
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
    config
  })
);

const mapDispatch = dispatch => ({
  fetchPerson: () => dispatch(fetchPersonList()),
  configTable: config => dispatch(configPersonTable(config))
});

export default connect(mapState, mapDispatch)(PersonTable);
