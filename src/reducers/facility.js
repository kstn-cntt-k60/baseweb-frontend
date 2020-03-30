import { arrayToObjectWithId } from "../util";

import {
  GOT_WAREHOUSE_LIST,
  CONFIG_WAREHOUSE_TABLE
} from "../actions/facility";

const initialState = {
  warehouseMap: {},
  warehouseIdList: [],
  warehouseCount: 0,
  warehousePage: 0,
  warehousePageSize: 5,
  warehouseSortedBy: "createdAt",
  warehouseSortOrder: "desc",
  warehouseSearchText: ""
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

    default:
      return state;
  }
};

export default facility;
