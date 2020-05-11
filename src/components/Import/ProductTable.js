import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configProductTable,
  fetchProductListByWarehouse
} from "../../actions/import";

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
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import MoreVertIcon from "@material-ui/icons/MoreVert";

import ProductInfoLink from "../Product/ProductInfoLink";

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

const ProductTable = ({
  warehouseId,
  entries,
  productCount,
  config,
  fetchProductList,
  configTable,
  onAddItem,
  onMoreInfo
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchProductList(warehouseId);
  }, [config]);

  const sortedBy = config.sortedBy;
  const sortOrder = config.sortOrder;

  const onPageChange = (_, newPage) => {
    configTable({ page: newPage });
  };

  const onPageSizeChange = e => {
    configTable({ pageSize: e.target.value });
  };

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
    <Paper>
      <form onSubmit={onSubmit}>
        <div className={classes.search}>
          <SearchIcon />
          <input
            className={classes.searchInput}
            placeholder="Search Product ..."
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
                  Product Name
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>Weight</TableCell>
              <TableCell className={classes.tableHead}>Unit</TableCell>
              <TableCell className={classes.tableHead}>
                Total Quantity
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
                <TableCell>
                  <ProductInfoLink id={e.id} name={e.name} />
                </TableCell>
                <TableCell>{e.weight}</TableCell>
                <TableCell>{e.unitUomId}</TableCell>
                <TableCell>{e.totalQuantity}</TableCell>
                <TableCell>{e.updatedAt}</TableCell>
                <TableCell>
                  <AddCircleOutlineIcon
                    className={classes.iconButton}
                    onClick={() => onAddItem(e.id)}
                  />
                </TableCell>
                <TableCell>
                  <MoreVertIcon
                    className={classes.iconButton}
                    onClick={() => onMoreInfo(e.id)}
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
        count={productCount}
        rowsPerPage={config.pageSize}
        page={config.page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.import.productMap,
  state => state.import.productIdList,
  state => state.import.productCount,
  state => state.import.productTable,
  (productMap, productIdList, productCount, config) => ({
    config,
    entries: productIdList
      .map(id => productMap[id])
      .map(p => ({
        ...p,
        weight: p.weight === null ? "" : `${p.weight}${p.weightUomId}`,
        updatedAt: p.updatedAt ? formatTime(p.updatedAt) : "None"
      })),
    productCount
  })
);

const mapDispatch = dispatch => ({
  fetchProductList: id => dispatch(fetchProductListByWarehouse(id)),
  configTable: config => dispatch(configProductTable(config))
});

export default connect(mapState, mapDispatch)(ProductTable);
