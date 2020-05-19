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
  makeStyles,
  withStyles
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";

import { fetchConfigList, configConfigTable } from "../../actions/salesroute";
import { formatTime, zeroPad } from "../../util";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

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

const ConfigTable = ({
  entries,
  configCount,
  config,
  fetchConfigList,
  configTable,
  onEdit,
  onDelete
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchConfigList();
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

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  return (
    <Paper>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search Sales Route Config ..."
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
              <StyledTableCell className={classes.tableHead}>
                <TableSortLabel
                  active={text === "" && sortedBy === "name"}
                  onClick={() => onSortChange("name")}
                  direction={sortOrder}
                >
                  Sales Route Config Code
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Repeat Week
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Day
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                Created By
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                <TableSortLabel
                  active={text === "" && sortedBy === "createdAt"}
                  onClick={() => onSortChange("createdAt")}
                  direction={sortOrder}
                >
                  Created At
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}>
                <TableSortLabel
                  active={text === "" && sortedBy === "updatedAt"}
                  onClick={() => onSortChange("updatedAt")}
                  direction={sortOrder}
                >
                  Updated At
                </TableSortLabel>
              </StyledTableCell>
              <StyledTableCell className={classes.tableHead}></StyledTableCell>
              <StyledTableCell className={classes.tableHead}></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <StyledTableRow key={e.id}>
                <StyledTableCell>{e.displayId}</StyledTableCell>
                <StyledTableCell>{e.repeatWeek}</StyledTableCell>
                <StyledTableCell>{e.dayList}</StyledTableCell>
                <StyledTableCell>{e.createdBy}</StyledTableCell>
                <StyledTableCell>{e.createdAt}</StyledTableCell>
                <StyledTableCell>{e.updatedAt}</StyledTableCell>
                <StyledTableCell>
                  <EditIcon
                    className={classes.iconButton}
                    onClick={() => onEdit(e.id)}
                    color="secondary"
                  />
                </StyledTableCell>
                <StyledTableCell>
                  <DeleteIcon
                    className={classes.iconButton}
                    onClick={() => onDelete(e.id)}
                    color="primary"
                  />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={configCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.salesroute.configMap,
  state => state.salesroute.configIdList,
  state => state.salesroute.configCount,
  state => state.salesroute.configTable,
  (configMap, configIdList, configCount, config) => ({
    config,
    entries: configIdList
      .map(id => configMap[id])
      .map(w => ({
        ...w,
        displayId: zeroPad(w.id, 5),
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    configCount
  })
);

const mapDispatch = dispatch => ({
  fetchConfigList: () => dispatch(fetchConfigList()),
  configTable: config => dispatch(configConfigTable(config))
});

export default connect(mapState, mapDispatch)(ConfigTable);