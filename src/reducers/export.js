import {
  CONFIG_EXPORTABLE_ORDER_TABLE,
  GOT_EXPORTABLE_ORDER_LIST,
  GOT_SINGLE_ORDER,
  CONFIG_COMPLETED_ORDER_TABLE,
  GOT_COMPLETED_ORDER_LIST
} from "../actions/export";

import { arrayToObjectWithId } from "../util";

const initialState = {
  exportableOrderMap: {},
  exportableOrderIdList: [],
  exportableOrderCount: 0,
  exportableOrderTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  completedOrderMap: {},
  completedOrderIdList: [],
  completedOrderCount: 0,
  completedOrderTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  currentOrder: null,
  orderItems: []
};

const exportReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_EXPORTABLE_ORDER_TABLE:
      return {
        ...state,
        exportableOrderTable: {
          ...state.exportableOrderTable,
          ...action.config
        }
      };

    case GOT_EXPORTABLE_ORDER_LIST:
      return {
        ...state,
        exportableOrderMap: arrayToObjectWithId(action.body.orderList),
        exportableOrderIdList: action.body.orderList.map(o => o.id),
        exportableOrderCount: action.body.orderCount
      };

    case GOT_SINGLE_ORDER:
      return {
        ...state,
        currentOrder: action.body.order,
        orderItems: action.body.orderItems
      };

    case CONFIG_COMPLETED_ORDER_TABLE:
      return {
        ...state,
        completedOrderTable: {
          ...state.completedOrderTable,
          ...action.config
        }
      };

    case GOT_COMPLETED_ORDER_LIST:
      return {
        ...state,
        completedOrderMap: arrayToObjectWithId(action.body.orderList),
        completedOrderIdList: action.body.orderList.map(o => o.id),
        completedOrderCount: action.body.orderCount
      };

    default:
      return state;
  }
};

export default exportReducer;
