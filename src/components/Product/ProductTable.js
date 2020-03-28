import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  productConfigTable,
  fetchProductListAction
} from "../../actions/product";

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

const ProductTable = ({
  entries,
  productCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText,
  onEdit,
  onDelete,
  fetchProductList,
  configTable
}) => {
  const [text, setText] = useState(searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchProductList();
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
              <TableCell className={classes.tableHead}>Created By</TableCell>
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
              <TableCell className={classes.tableHead}>Description</TableCell>
              <TableCell className={classes.tableHead}></TableCell>
              <TableCell className={classes.tableHead}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.name}</TableCell>
                <TableCell>{e.weight}</TableCell>
                <TableCell>{e.unitUomId}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
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
        count={productCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapState = createSelector(
  state => state.product.productMap,
  state => state.product.productIdList,
  state => state.product.productCount,
  state => state.product.productPage,
  state => state.product.productPageSize,
  state => state.product.productSortedBy,
  state => state.product.productSortOrder,
  state => state.product.productSearchText,
  (
    productMap,
    productIdList,
    productCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  ) => ({
    entries: productIdList
      .map(id => productMap[id])
      .map(p => ({
        ...p,
        weight: p.weight === null ? "" : `${p.weight}${p.weightUomId}`,
        createdAt: formatTime(p.createdAt),
        updatedAt: formatTime(p.updatedAt)
      })),
    productCount,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  })
);

const mapDispatch = dispatch => ({
  fetchProductList: () => dispatch(fetchProductListAction()),
  configTable: (page, pageSize, sortedBy, sortOrder, searchText = "") =>
    dispatch(
      productConfigTable(page, pageSize, sortedBy, sortOrder, searchText)
    )
});

export default connect(mapState, mapDispatch)(ProductTable);
