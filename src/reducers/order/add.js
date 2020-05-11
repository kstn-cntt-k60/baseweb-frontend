import {
  CONFIG_CUSTOMER_TABLE,
  GOT_CUSTOMER_LIST,
  CONFIG_WAREHOUSE_TABLE,
  GOT_WAREHOUSE_LIST,
  CONFIG_PRICING_TABLE,
  GOT_PRODUCT_INFO_LIST,
  CONFIG_CUSTOMER_STORE_TABLE,
  GOT_CUSTOMER_STORE_LIST,
  ADDED_ORDER,
  ADD_ORDER_FAILED
} from "../../actions/order";

import { arrayToObjectWithId } from "../../util";

const initialState = {
  customerMap: {},
  customerIdList: [],
  customerCount: 0,
  customerTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  warehouseMap: {},
  warehouseIdList: [],
  warehouseCount: 0,
  warehouseTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  productInfoMap: {},
  productInfoIdList: [],
  productInfoCount: 0,
  productInfoPriceMap: {},
  productInfoTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  storeMap: {},
  storeIdList: [],
  storeCount: 0,
  storeTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  addedOrderSequence: 0,
  addOrderFailedSequence: 0
};

const add = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_CUSTOMER_TABLE:
      return {
        ...state,
        customerTable: {
          ...state.customerTable,
          ...action.config
        }
      };

    case GOT_CUSTOMER_LIST:
      return {
        ...state,
        customerMap: arrayToObjectWithId(action.body.customerList),
        customerIdList: action.body.customerList.map(c => c.id),
        customerCount: action.body.count
      };

    case CONFIG_WAREHOUSE_TABLE:
      return {
        ...state,
        warehouseTable: {
          ...state.warehouseTable,
          ...action.config
        }
      };

    case GOT_WAREHOUSE_LIST:
      return {
        ...state,
        warehouseMap: arrayToObjectWithId(action.body.warehouseList),
        warehouseIdList: action.body.warehouseList.map(c => c.id),
        warehouseCount: action.body.warehouseCount
      };

    case CONFIG_PRICING_TABLE:
      return {
        ...state,
        productInfoTable: {
          ...state.productInfoTable,
          ...action.config
        }
      };

    case GOT_PRODUCT_INFO_LIST:
      return {
        ...state,
        productInfoMap: arrayToObjectWithId(action.body.productInfoList),
        productInfoIdList: action.body.productInfoList.map(p => p.id),
        productInfoCount: action.body.productInfoCount
      };

    case CONFIG_CUSTOMER_STORE_TABLE:
      return {
        ...state,
        storeTable: {
          ...state.storeTable,
          ...action.config
        }
      };

    case GOT_CUSTOMER_STORE_LIST:
      return {
        ...state,
        storeMap: arrayToObjectWithId(action.body.storeList),
        storeIdList: action.body.storeList.map(p => p.id),
        storeCount: action.body.storeCount
      };

    case ADDED_ORDER:
      return {
        ...state,
        addedOrderSequence: state.addedOrderSequence + 1
      };

    case ADD_ORDER_FAILED:
      return {
        ...state,
        addOrderFailedSequence: state.addOrderFailedSequence + 1
      };

    default:
      return state;
  }
};

export default add;
