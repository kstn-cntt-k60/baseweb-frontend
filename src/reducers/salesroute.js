import {
  CONFIG_SALESMAN_TABLE,
  GOT_SALESMAN_LIST,
  GOT_PLANNING_LIST,
  CONFIG_PLANNING_TABLE,
  GOT_PLANNING,
  CONFIG_CONFIG_TABLE,
  GOT_CONFIG_LIST,
  FIND_STORE_OF_SALESMAN
} from "../actions/salesroute";
import { arrayToObjectWithId } from "../util";
import { GOT_PAIR_STORE_SALESMAN } from "../actions/facility";

const initialState = {
  salesmanMap: {},
  salesmanIdList: [],
  salesmanCount: 0,
  salesmanTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  planningMap: {},
  planningIdList: [],
  planningCount: 0,
  planningTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "updatedAt",
    sortOrder: "desc",
    searchText: ""
  },

  configMap: {},
  configIdList: [],
  configCount: 0,
  configTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "updatedAt",
    sortOrder: "desc",
    searchText: ""
  },

  storeOfSalesman: {},
  pairStoreSalesman: []
};

const salesroute = (state = initialState, action) => {
  switch (action.type) {
    case CONFIG_SALESMAN_TABLE:
      return {
        ...state,
        salesmanTable: { ...state.salesmanTable, ...action.config }
      };

    case GOT_SALESMAN_LIST:
      return {
        ...state,
        salesmanMap: arrayToObjectWithId(action.body.salesmanList),
        salesmanIdList: action.body.salesmanList.map(s => s.id),
        salesmanCount: action.body.salesmanCount
      };

    case GOT_PLANNING_LIST:
      return {
        ...state,
        planningMap: arrayToObjectWithId(action.body.planningList),
        planningIdList: action.body.planningList.map(s => s.id),
        planningCount: action.body.planningCount
      };

    case CONFIG_PLANNING_TABLE:
      return {
        ...state,
        planningTable: { ...state.planningTable, ...action.config }
      };

    case GOT_PLANNING:
      return {
        ...state,
        planningMap: {
          ...state.planningMap,
          [action.body.id]: action.body
        }
      };

    case CONFIG_CONFIG_TABLE:
      return {
        ...state,
        configTable: { ...state.configTable, ...action.config }
      };

    case GOT_CONFIG_LIST:
      return {
        ...state,
        configMap: arrayToObjectWithId(action.body.configList),
        configIdList: action.body.configList.map(s => s.id),
        configCount: action.body.configCount
      };

    case FIND_STORE_OF_SALESMAN:
      return {
        ...state,
        storeOfSalesman: arrayToObjectWithId(action.body.listStore)
      };

    case GOT_PAIR_STORE_SALESMAN:
      return {
        ...state,
        pairStoreSalesman: action.body.pairStoreSalesman
      };
    default:
      return state;
  }
};

export default salesroute;
