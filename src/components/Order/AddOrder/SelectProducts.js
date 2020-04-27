import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";

import {
  configPricingTable,
  fetchProductInfoList
} from "../../../actions/order";

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
  IconButton,
  ListItemSecondaryAction,
  List,
  ListItem,
  ListItemText,
  Divider,
  makeStyles
} from "@material-ui/core";

import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import SearchIcon from "@material-ui/icons/Search";
import DeleteIcon from "@material-ui/icons/Delete";

import { formatTime } from "../../../util";

import AddProductDialog, { getQuantityAvailable } from "./AddProductDialog";

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
  },
  table: {
    marginBottom: theme.spacing(1)
  }
}));

const switchSortOrder = order => (order === "desc" ? "asc" : "desc");

const SelectProducts = ({
  entries,
  productInfoCount,
  config,
  products,
  warehouse,
  fetchProductInfo,
  configTable,
  setProducts
}) => {
  const [text, setText] = useState(config.searchText);
  const [focus, setFocus] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [product, setProduct] = useState(null);

  const classes = useStyles({ focus });

  useEffect(() => {
    fetchProductInfo(warehouse.id);
  }, [config, warehouse]);

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

  const onAdd = p => {
    setOpenAdd(true);
    setProduct(p);
  };

  const addProduct = p => {
    setProducts([...products, p]);
    setOpenAdd(false);
  };

  const onDelete = index => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  return (
    <React.Fragment>
      <Paper className={classes.table}>
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
                <TableCell className={classes.tableHead}>
                  Quantity Available
                </TableCell>
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
                  <TableCell>{getQuantityAvailable(e, products)}</TableCell>
                  {e.price === "" ? (
                    <TableCell></TableCell>
                  ) : (
                    <TableCell>
                      <AddCircleOutlineIcon
                        className={classes.iconButton}
                        onClick={() => onAdd(e)}
                      />
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={productInfoCount}
          rowsPerPage={config.pageSize}
          page={config.page}
          onChangePage={onPageChange}
          onChangeRowsPerPage={onPageSizeChange}
        />
      </Paper>
      <Paper>
        <List>
          {products.map((p, index) => (
            <React.Fragment key={index}>
              {index === 0 ? "" : <Divider component="li" />}
              <ListItem>
                <ListItemText
                  primary={p.name}
                  secondary={
                    <React.Fragment>
                      <span>Quantity: {p.quantity}</span>
                      <br />
                      <span>Unit: {p.unitUomId}</span>
                      <br />
                      <span>Weight: {p.weight}</span>
                    </React.Fragment>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton onClick={() => onDelete(index)}>
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </React.Fragment>
          ))}
        </List>
      </Paper>
      <AddProductDialog
        open={openAdd}
        onClose={() => setOpenAdd(false)}
        product={product}
        products={products}
        addProduct={addProduct}
      />
    </React.Fragment>
  );
};

const mapState = createSelector(
  state => state.order.add.productInfoMap,
  state => state.order.add.productInfoIdList,
  state => state.order.add.productInfoCount,
  state => state.order.add.productInfoTable,
  (productInfoMap, productInfoIdList, productInfoCount, config) => ({
    entries: productInfoIdList
      .map(id => productInfoMap[id])
      .map(p => ({
        ...p,
        weight: p.weight === null ? "" : `${p.weight}${p.weightUomId}`,
        createdAt: formatTime(p.createdAt),
        updatedAt: formatTime(p.updatedAt),
        price: p.price + p.currencyUomId,
        effectiveFrom: formatTime(p.effectiveFrom)
      })),
    productInfoCount,
    config
  })
);

const mapDispatch = dispatch => ({
  fetchProductInfo: warehouseId => dispatch(fetchProductInfoList(warehouseId)),
  configTable: config => dispatch(configPricingTable(config))
});

export default connect(mapState, mapDispatch)(SelectProducts);
