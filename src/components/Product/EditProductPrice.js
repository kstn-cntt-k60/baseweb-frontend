import React, { useState } from "react";
import { connect } from "react-redux";
import { createSelector } from "reselect";
import { formatTime } from "../../util";

import { Paper, Divider, Button, makeStyles } from "@material-ui/core";

import PriceTable from "./PriceTable";
import AddPriceDialog from "./AddPriceDialog";

const useStyles = makeStyles(theme => ({
  info: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  edit: {
    marginTop: theme.spacing(2)
  }
}));

const EditProductPrice = ({ id, getCurrent }) => {
  const current = getCurrent(id);
  const classes = useStyles();

  const [openAdd, setOpenAdd] = useState(false);

  return (
    <React.Fragment>
      {id && current ? (
        <Paper className={classes.edit}>
          <div className={classes.info}>
            <div>
              <h3>Product Name: {current.name}</h3>
              <h3>Weight: {current.weight}</h3>
              <h3>Price: {current.price}</h3>
              <h3>Price Set By: {current.createdBy}</h3>
              <h3>Effective From: {current.effectiveFrom}</h3>
              <h3>Expired At: {current.expiredAt}</h3>
            </div>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={() => setOpenAdd(true)}
          >
            Set New Price
          </Button>
          <Divider />
          <PriceTable productId={id} />
          <AddPriceDialog
            productId={id}
            open={openAdd}
            onClose={() => setOpenAdd(false)}
          />
        </Paper>
      ) : (
        ""
      )}
    </React.Fragment>
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
    name: p.name,
    weight: p.weight === null ? "None" : `${p.weight}${p.weightUomId}`,
    price: pp ? pp.price + pp.currencyUomId : "None",
    createdBy: pp ? pp.createdBy : "None",
    effectiveFrom: pp ? formatTime(pp.effectiveFrom) : "None",
    expiredAt: pp && pp.expiredAt ? formatTime(pp.expiredAt) : "None"
  };
};

const mapState = createSelector(
  state => state.product.pricingMap,
  state => state.product.pricingPriceMap,
  (productMap, priceMap) => {
    const map = mapOfProductPrices(priceMap);
    return {
      getCurrent: id =>
        id && productMap[id] ? selectProduct(productMap[id], map) : null
    };
  }
);

const mapDispatch = () => ({});

export default connect(mapState, mapDispatch)(EditProductPrice);
