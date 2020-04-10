import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  pricingConfigTable,
  fetchProductPricingListAction
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

const ProductPricingTable = ({
  entries,
  pricingCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText,
  onEdit,
  fetchPricingList,
  configTable
}) => {
  const [text, setText] = useState(searchText);
  const [focus, setFocus] = useState(false);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchPricingList();
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
              <TableCell className={classes.tableHead}>Price</TableCell>
              <TableCell className={classes.tableHead}>From</TableCell>
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
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.effectiveFrom}</TableCell>
                <TableCell>
                  <EditIcon
                    className={classes.iconButton}
                    onClick={() => onEdit(e.id)}
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
        count={pricingCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

const mapOfProductPrices = priceMap => {
  const result = {};
  Object.values(priceMap).forEach(pp => {
    result[pp.productId] = pp;
  });
  return result;
};

const selectProduct = (p, map) => {
  const pp = map[p.id] ? map[p.id] : null;
  return {
    ...p,
    weight: p.weight === null ? "" : `${p.weight}${p.weightUomId}`,
    createdAt: formatTime(p.createdAt),
    updatedAt: formatTime(p.updatedAt),
    price: pp ? pp.price + pp.currencyUomId : "",
    effectiveFrom: pp ? formatTime(pp.effectiveFrom) : ""
  };
};

const mapState = createSelector(
  state => state.product.pricingMap,
  state => state.product.pricingIdList,
  state => state.product.pricingCount,
  state => state.product.pricingPriceMap,
  state => state.product.pricingPage,
  state => state.product.pricingPageSize,
  state => state.product.pricingSortedBy,
  state => state.product.pricingSortOrder,
  state => state.product.pricingSearchText,
  (
    pricingMap,
    pricingIdList,
    pricingCount,
    priceMap,
    page,
    pageSize,
    sortedBy,
    sortOrder,
    searchText
  ) => {
    const map = mapOfProductPrices(priceMap);
    const entries = pricingIdList
      .map(id => pricingMap[id])
      .map(p => selectProduct(p, map));

    return {
      entries,
      pricingCount,
      page,
      pageSize,
      sortedBy,
      sortOrder,
      searchText
    };
  }
);

const mapDispatch = dispatch => ({
  fetchPricingList: () => dispatch(fetchProductPricingListAction()),
  configTable: (page, pageSize, sortedBy, sortOrder, searchText = "") =>
    dispatch(
      pricingConfigTable(page, pageSize, sortedBy, sortOrder, searchText)
    )
});

export default connect(mapState, mapDispatch)(ProductPricingTable);
