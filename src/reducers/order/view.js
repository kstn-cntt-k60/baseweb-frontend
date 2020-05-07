import {
  CONFIG_ORDER_TABLE,
  GOT_ORDER_LIST,
  GOT_SINGLE_ORDER
} from "../../actions/order";

import { arrayToObjectWithId } from "../../util";

const initialState = {
  orderMap: {},
  orderIdList: [],
  orderCount: 0,
  orderTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    statusId: ""
  },

  currentOrder: null,
  orderItems: []
};

const view = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_ORDER_TABLE:
      return {
        ...state,
        orderTable: {
          ...state.orderTable,
          ...action.config
        }
      };

    case GOT_ORDER_LIST:
      return {
        ...state,
        orderMap: arrayToObjectWithId(action.body.orderList),
        orderIdList: action.body.orderList.map(o => o.id),
        orderCount: action.body.orderCount
      };

    case GOT_SINGLE_ORDER:
      return {
        ...state,
        currentOrder: action.body.order,
        orderItems: action.body.orderItems
      };

    default:
      return state;
  }
};

export default view;
