import {
  GOT_WAREHOUSE_LIST,
  GOT_WAREHOUSE,
  CONFIG_WAREHOUSE_TABLE,
  CONFIG_PRODUCT_TABLE,
  GOT_PRODUCT_LIST_BY_WAREHOUSE,
  CONFIG_INVENTORY_ITEM_TABLE,
  GOT_INVENTORY_LIST,
  CONFIG_PRODUCT_INVENTORY_TABLE,
  GOT_PRODUCT_INVENTORY_ITEMS
} from "../actions/import";
import { arrayToObjectWithId } from "../util";

const initialState = {
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

  productMap: {},
  productIdList: [],
  productCount: 0,
  productTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "updatedAt",
    sortOrder: "desc",
    searchText: ""
  },

  inventoryMap: {},
  inventoryIdList: [],
  inventoryCount: 0,
  inventoryTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  productInventoryMap: {},
  productInventoryIdList: [],
  productInventoryCount: 0,
  productInventoryTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  }
};

const importReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_WAREHOUSE_LIST:
      return {
        ...state,
        warehouseCount: action.body.warehouseCount,
        warehouseMap: arrayToObjectWithId(action.body.warehouseList),
        warehouseIdList: action.body.warehouseList.map(w => w.id)
      };

    case GOT_WAREHOUSE:
      return {
        ...state,
        warehouseMap: {
          ...state.warehouseMap,
          [action.body.id]: action.body
        }
      };

    case CONFIG_WAREHOUSE_TABLE:
      return {
        ...state,
        warehouseTable: {
          ...state.warehouseTable,
          ...action.config
        }
      };

    case CONFIG_PRODUCT_TABLE:
      return {
        ...state,
        productTable: {
          ...state.productTable,
          ...action.config
        }
      };

    case GOT_PRODUCT_LIST_BY_WAREHOUSE:
      return {
        ...state,
        productCount: action.body.count,
        productMap: arrayToObjectWithId(action.body.productList),
        productIdList: action.body.productList.map(w => w.id)
      };

    case CONFIG_INVENTORY_ITEM_TABLE:
      return {
        ...state,
        inventoryTable: {
          ...state.inventoryTable,
          ...action.config
        }
      };

    case GOT_INVENTORY_LIST:
      return {
        ...state,
        inventoryCount: action.body.inventoryCount,
        inventoryMap: arrayToObjectWithId(action.body.inventoryList),
        inventoryIdList: action.body.inventoryList.map(item => item.id)
      };

    case CONFIG_PRODUCT_INVENTORY_TABLE:
      return {
        ...state,
        productInventoryTable: {
          ...state.productInventoryTable,
          ...action.config
        }
      };

    case GOT_PRODUCT_INVENTORY_ITEMS:
      return {
        ...state,
        productInventoryCount: action.body.inventoryCount,
        productInventoryMap: arrayToObjectWithId(action.body.inventoryList),
        productInventoryIdList: action.body.inventoryList.map(item => item.id)
      };

    default:
      return state;
  }
};

export default importReducer;
