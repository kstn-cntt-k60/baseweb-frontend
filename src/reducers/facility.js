import { arrayToObjectWithId } from "../util";

import {
  GOT_WAREHOUSE_LIST,
  CONFIG_WAREHOUSE_TABLE,
  GOT_CUSTOMER_STORE_LIST,
  CONFIG_CUSTOMER_STORE_TABLE,
  GOT_SEARCH_CUSTOMER,
  GOT_ALL_CUSTOMER_STORE
} from "../actions/facility";

const initialState = {
  warehouseMap: {},
  warehouseIdList: [],
  warehouseCount: 0,
  warehousePage: 0,
  warehousePageSize: 5,
  warehouseSortedBy: "createdAt",
  warehouseSortOrder: "desc",
  warehouseSearchText: "",

  storeMap: {},
  storeIdList: [],
  storeCount: 0,
  storePage: 0,
  storePageSize: 5,
  storeSortedBy: "createdAt",
  storeSortOrder: "desc",
  storeSearchText: "",

  allCustomerStore: {},

  customerList: [],
  customerListSequence: 0
};

const facility = (state = initialState, action) => {
  switch (action.type) {
    case GOT_WAREHOUSE_LIST:
      return {
        ...state,
        warehouseCount: action.body.warehouseCount,
        warehouseMap: arrayToObjectWithId(action.body.warehouseList),
        warehouseIdList: action.body.warehouseList.map(w => w.id)
      };

    case CONFIG_WAREHOUSE_TABLE:
      return {
        ...state,
        warehousePage: action.page,
        warehousePageSize: action.pageSize,
        warehouseSortedBy: action.sortedBy,
        warehouseSortOrder: action.sortOrder,
        warehouseSearchText: action.searchText
      };

    case GOT_CUSTOMER_STORE_LIST:
      return {
        ...state,
        storeCount: action.body.storeCount,
        storeMap: arrayToObjectWithId(action.body.storeList),
        storeIdList: action.body.storeList.map(w => w.id)
      };

    case CONFIG_CUSTOMER_STORE_TABLE:
      return {
        ...state,
        storePage: action.page,
        storePageSize: action.pageSize,
        storeSortedBy: action.sortedBy,
        storeSortOrder: action.sortOrder,
        storeSearchText: action.searchText
      };

    case GOT_SEARCH_CUSTOMER:
      return {
        ...state,
        customerList: action.body,
        customerListSequence: state.customerListSequence + 1
      };

    case GOT_ALL_CUSTOMER_STORE:
      return {
        ...state,
        allCustomerStore: arrayToObjectWithId(action.body.listAllStore)
      };

    default:
      return state;
  }
};

export default facility;
