import {
  CONFIG_SALESMAN_TABLE,
  GOT_SALESMAN_LIST,
  GOT_PLANNING_LIST,
  CONFIG_PLANNING_TABLE,
  GOT_CONFIG_LIST,
  CONFIG_CONFIG_TABLE,
  CONFIG_CUSTOMER_TABLE,
  GOT_CUSTOMER_LIST,
  ADDED_SCHEDULE,
  ADD_SCHEDULE_FAILED,
  GOT_SCHEDULE_LIST,
  CONFIG_SCHEDULE_TABLE,
  GOT_SCHEDULE,
  CONFIG_STORE_TABLE,
  GOT_STORE_LIST,
  GOT_CLUSTERING_LIST
} from "../actions/schedule";

import { arrayToObjectWithId } from "../util";
const INIT = "INIT";
const LOADED = "LOADED";

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

  customerMap: {},
  customerIdList: [],
  customerCount: 0,
  customerTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  scheduleMap: {},
  scheduleIdList: [],
  scheduleCount: 0,
  scheduleTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  storeMap: {},
  storeIdList: [],
  storeCount: 0,
  storeTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc"
  },

  clusterMap: {},
  clusteringState: INIT,
  nClusterStore: 0,

  addedScheduleSequence: 0,
  addScheduleFailedSequence: 0
};

const neighborsToMap = neighbors => {
  const result = {};
  neighbors.forEach(nb => {
    if (result[nb.index]) {
      result[nb.index].push(nb);
    } else {
      result[nb.index] = [nb];
    }
  });
  return result;
};

const schedule = (state = initialState, action) => {
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

    case ADDED_SCHEDULE:
      return {
        ...state,
        addedScheduleSequence: state.addedScheduleSequence + 1
      };

    case ADD_SCHEDULE_FAILED:
      return {
        ...state,
        addScheduleFailedSequence: state.addScheduleFailedSequence + 1
      };

    case GOT_SCHEDULE_LIST:
      return {
        ...state,
        scheduleMap: arrayToObjectWithId(action.body.scheduleList),
        scheduleIdList: action.body.scheduleList.map(s => s.id),
        scheduleCount: action.body.scheduleCount
      };

    case CONFIG_SCHEDULE_TABLE:
      return {
        ...state,
        scheduleTable: { ...state.scheduleTable, ...action.config }
      };

    case GOT_SCHEDULE:
      return {
        ...state,
        scheduleMap: {
          ...state.scheduleMap,
          [action.body.id]: action.body
        }
      };

    case CONFIG_STORE_TABLE:
      return {
        ...state,
        storeTable: { ...state.storeTable, ...action.config }
      };

    case GOT_STORE_LIST:
      return {
        ...state,
        storeMap: arrayToObjectWithId(action.body.storeList),
        storeIdList: action.body.storeList.map(s => s.id),
        storeCount: action.body.storeCount
      };

    case GOT_CLUSTERING_LIST:
      return {
        ...state,
        clusteringState: LOADED,
        clusterMap: neighborsToMap(action.body),
        nClusterStore: Object.keys(neighborsToMap(action.body)).length
      };

    default:
      return state;
  }
};

export default schedule;
