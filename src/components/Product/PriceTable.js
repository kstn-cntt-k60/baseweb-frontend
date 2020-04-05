import React, { useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  priceConfigTable,
  fetchProductPriceListAction
} from "../../actions/product";

import {
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

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  iconButton: {
    cursor: "pointer"
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const PriceTable = ({
  productId,
  entries,
  priceCount,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  fetchPriceList,
  configTable
}) => {
  const classes = useStyles();

  useEffect(() => {
    fetchPriceList(productId);
  }, [productId, page, pageSize, sortedBy, sortOrder]);

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

  return (
    <React.Fragment>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Price</TableCell>
              <TableCell className={classes.tableHead}>Set By</TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={sortedBy === "effectiveFrom"}
                  onClick={() => onSortChange("effectiveFrom")}
                  direction={sortOrder}
                >
                  Effective From
                </TableSortLabel>
              </TableCell>
              <TableCell className={classes.tableHead}>
                <TableSortLabel
                  active={sortedBy === "expiredAt"}
                  onClick={() => onSortChange("expiredAt")}
                  direction={sortOrder}
                >
                  Expired At
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
            </TableRow>
          </TableHead>
          <TableBody>
            {entries.map(e => (
              <TableRow key={e.id}>
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.createdBy}</TableCell>
                <TableCell>{e.effectiveFrom}</TableCell>
                <TableCell>{e.expiredAt}</TableCell>
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
        count={priceCount}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </React.Fragment>
  );
};

const mapState = createSelector(
  state => state.product.priceMap,
  state => state.product.priceIdList,
  state => state.product.priceCount,
  state => state.product.pricePage,
  state => state.product.pricePageSize,
  state => state.product.priceSortedBy,
  state => state.product.priceSortOrder,
  (priceMap, priceIdList, priceCount, page, pageSize, sortedBy, sortOrder) => {
    const entries = priceIdList
      .map(id => priceMap[id])
      .map(p => ({
        ...p,
        price: p.price + p.currencyUomId,
        createdAt: formatTime(p.createdAt),
        updatedAt: formatTime(p.updatedAt),
        effectiveFrom: formatTime(p.effectiveFrom),
        expiredAt: p.expiredAt ? formatTime(p.expiredAt) : "None"
      }));

    return {
      entries,
      priceCount,
      page,
      pageSize,
      sortedBy,
      sortOrder
    };
  }
);

const mapDispatch = dispatch => ({
  fetchPriceList: productId => dispatch(fetchProductPriceListAction(productId)),
  configTable: (page, pageSize, sortedBy, sortOrder) =>
    dispatch(priceConfigTable(page, pageSize, sortedBy, sortOrder))
});

export default connect(mapState, mapDispatch)(PriceTable);
