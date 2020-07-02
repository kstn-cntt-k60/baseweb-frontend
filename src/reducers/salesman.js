import {
  GOT_USER_LOGIN_LIST,
  CONFIG_USER_LOGIN_TABLE,
  GOT_SCHEDULE_LIST,
  CONFIG_SCHEDULE_TABLE,
  GOT_SCHEDULE,
  ADDED_CHECKIN,
  ADD_CHECKIN_FAILED,
  GOT_PLANNING_LIST,
  CONFIG_PLANNING_TABLE,
  CONFIG_CUSTOMER_TABLE,
  GOT_CUSTOMER_LIST,
  CONFIG_CHECKIN_HISTORY_TABLE,
  GOT_CHECKIN_HISTORY_LIST,
  FIND_STORE_OF_SALESMAN
} from "../actions/salesman";
import { arrayToObjectWithId } from "../util";

const initialState = {
  userLoginCount: 0,
  userLoginMap: {},
  userLoginIdList: [],
  userLoginTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
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

  planningMap: {},
  planningIdList: [],
  planningCount: 0,
  planningTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "updatedAt",
    sortOrder: "desc"
  },

  customerMap: {},
  customerIdList: [],
  customerCount: 0,
  customerTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt"
  },

  checkinMap: {},
  checkinIdList: [],
  checkinCount: 0,
  checkinTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "checkinTime",
    sortOrder: "desc"
  },

  addedCheckinSequence: 0,
  addCheckinFailedSequence: 0
};

const salesman = (state = initialState, action) => {
  switch (action.type) {
    case GOT_USER_LOGIN_LIST:
      return {
        ...state,
        userLoginCount: action.body.userLoginCount,
        userLoginMap: arrayToObjectWithId(action.body.userLoginList),
        userLoginIdList: action.body.userLoginList.map(p => p.id)
      };

    case CONFIG_USER_LOGIN_TABLE:
      return {
        ...state,
        userLoginTable: {
          ...state.userLoginTable,
          ...action.config
        }
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

    case ADDED_CHECKIN:
      return {
        ...state,
        addedCheckinSequence: state.addedCheckinSequence + 1
      };

    case ADD_CHECKIN_FAILED:
      return {
        ...state,
        addCheckinFailedSequence: state.addCheckinFailedSequence + 1
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
        customerCount: action.body.customerCount
      };

    case CONFIG_CHECKIN_HISTORY_TABLE:
      return {
        ...state,
        checkinTable: {
          ...state.checkinTable,
          ...action.config
        }
      };

    case GOT_CHECKIN_HISTORY_LIST:
      return {
        ...state,
        checkinMap: arrayToObjectWithId(action.body.checkinList),
        checkinIdList: action.body.checkinList.map(c => c.id),
        checkinCount: action.body.checkinCount
      };

    default:
      return state;
  }
};

export default salesman;
