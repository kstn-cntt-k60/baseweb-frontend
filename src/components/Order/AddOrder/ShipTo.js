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
  FormControl,
  TextField,
  makeStyles
} from "@material-ui/core";

import SearchIcon from "@material-ui/icons/Search";

import {
  fetchCustomerStoreList,
  configCustomerStoreTable
} from "../../../actions/order";
import { formatTime } from "../../../util";

const useStyles = makeStyles(theme => ({
  tableHead: {
    fontWeight: "bold"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
    }
  },
  rowSelected: {
    cursor: "pointer",
    backgroundColor: "#afa",
    "&:hover": {
      backgroundColor: "#8f8"
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
  },
  address: {
    padding: theme.spacing(1)
  },
  textField: {
    width: 400
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const ShipTo = ({
  entries,
  storeCount,
  config,
  customer,
  selectedStore,
  onSelectStore,
  address,
  setAddress,
  fetchStore,
  configTable
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchStore(customer.id);
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

  const rowClass = id =>
    id === (selectedStore && selectedStore.id)
      ? classes.rowSelected
      : classes.row;

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  return (
    <React.Fragment>
      <Paper>
        <FormControl className={classes.address}>
          <TextField
            className={classes.textField}
            autoFocus
            margin="dense"
            label="Address"
            type="text"
            value={address}
            onChange={e => setAddress(e.target.value)}
            fullWidth
          />
        </FormControl>
      </Paper>
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
                <TableCell className={classes.tableHead}>
                  Customer Name
                </TableCell>
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
                  className={rowClass(e.id)}
                  onClick={() => onSelectStore(e)}
                >
                  <TableCell>{e.name}</TableCell>
                  <TableCell>{e.address}</TableCell>
                  <TableCell>{e.customer}</TableCell>
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
          count={storeCount}
          rowsPerPage={config.pageSize}
          page={config.page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
        />
      </Paper>
    </React.Fragment>
  );
};

const mapState = createSelector(
  state => state.order.add.storeMap,
  state => state.order.add.storeIdList,
  state => state.order.add.storeCount,
  state => state.order.add.storeTable,
  (storeMap, storeIdList, storeCount, config) => ({
    entries: storeIdList
      .map(id => storeMap[id])
      .map(w => ({
        ...w,
        createdAt: formatTime(w.createdAt),
        updatedAt: formatTime(w.updatedAt)
      })),
    storeCount,
    config
  })
);

const mapDispatch = dispatch => ({
  fetchStore: customerId => dispatch(fetchCustomerStoreList(customerId)),
  configTable: config => dispatch(configCustomerStoreTable(config))
});

export default connect(mapState, mapDispatch)(ShipTo);
