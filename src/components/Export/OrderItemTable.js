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

import { formatTime } from "../../util";

import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import ExportDialog from "./ExportDialog";

const useStyles = makeStyles(() => ({
  tableHead: {
    fontWeight: "bold"
  },
  row: {
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#eee"
    }
  }
}));

const paginateOrderItems = (items, page, pageSize) =>
  items.slice(page * pageSize, (page + 1) * pageSize).map(item => ({
    ...item,
    price: `${item.price}${item.currencyUomId}`,
    effectiveFrom: formatTime(item.effectiveFrom),
    totalPrice: `${parseFloat(item.price) * item.quantity}${item.currencyUomId}`
  }));

const OrderItemTable = ({ orderId, items }) => {
  const classes = useStyles();

  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(5);

  const [openExport, setOpenExport] = useState(false);
  const [orderSeq, setOrderSeq] = useState(null);

  const paginatedItems = paginateOrderItems(items, page, pageSize);

  const onPageChange = (_, newPage) => {
    setPage(newPage);
  };

  const onPageSizeChange = e => {
    setPageSize(e.target.value);
  };

  const onSelectRow = e => () => {
    if (!e.exported) {
      setOpenExport(true);
      setOrderSeq(e.saleOrderSeq);
    }
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
              <TableCell className={classes.tableHead}>Exported</TableCell>
              <TableCell className={classes.tableHead}>Total Price</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedItems.map(e => (
              <TableRow
                key={e.saleOrderSeq}
                className={classes.row}
                onClick={onSelectRow(e)}
              >
                <TableCell>{e.productName}</TableCell>
                <TableCell>{e.quantity}</TableCell>
                <TableCell>{e.price}</TableCell>
                <TableCell>{e.effectiveFrom}</TableCell>
                <TableCell>{e.exported ? "True" : "False"}</TableCell>
                <TableCell>{e.totalPrice}</TableCell>
                <TableCell>
                  {e.exported ? "" : <OpenInNewIcon color="primary" />}
                </TableCell>
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

      <ExportDialog
        open={openExport}
        orderId={orderId}
        orderSeq={orderSeq}
        onClose={() => setOpenExport(false)}
      />
    </Paper>
  );
};

export default OrderItemTable;
