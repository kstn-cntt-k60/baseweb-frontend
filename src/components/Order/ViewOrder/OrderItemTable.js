import React, { useState } from "react";

import {
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  makeStyles
} from "@material-ui/core";

import { formatTime } from "../../../util";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  }
}));

const paginateOrderItems = (items, page, pageSize) =>
  items.slice(page * pageSize, (page + 1) * pageSize).map(item => ({
    ...item,
    price: `${item.price}${item.currencyUomId}`,
    effectiveFrom: formatTime(item.effectiveFrom),
    totalPrice: `${parseFloat(item.price) * item.quantity}${item.currencyUomId}`
  }));

const OrderItemTable = ({ items }) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const paginatedItems = paginateOrderItems(items, page, pageSize);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onPageSizeChange = e => {
    setPageSize(e.target.value);
  };

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHead}>Product Name</TableCell>
              <TableCell className={classes.tableHead}>Quantity</TableCell>
              <TableCell className={classes.tableHead}>Price</TableCell>
              <TableCell className={classes.tableHead}>
                Effective From
              </TableCell>
              <TableCell className={classes.tableHead}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map(e => (
              <TableRow key={e.saleOrderSeq}>
                <TableCell>{e.productName}</TableCell>
                <TableCell>{e.quantity}</TableCell>
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.effectiveFrom}</TableCell>
                <TableCell>{e.totalPrice}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={items.length}
        rowsPerPage={pageSize}
        page={page}
        onChangePage={onPageChange}
        onChangeRowsPerPage={onPageSizeChange}
      />
    </Paper>
  );
};

export default OrderItemTable;
