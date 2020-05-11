import {
  GOT_PERSON_LIST,
  CONFIG_PERSON_TABLE,
  GOT_CUSTOMER_LIST,
  CONFIG_CUSTOMER_TABLE,
  GOT_SEARCH_PERSON,
  RESET_SEARCH_PERSON,
  GOT_USER_LOGIN_LIST,
  CONFIG_USER_LOGIN_TABLE
} from "../actions/account";

import { arrayToObjectWithId } from "../util";
import { LOGOUT } from "../actions";

const initialState = {
  personCount: 0,
  personMap: {},
  personIdList: [],
  personTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  customerCount: 0,
  customerMap: {},
  customerIdList: [],
  customerTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  },

  searchPerson: [],

  userLoginCount: 0,
  userLoginMap: {},
  userLoginIdList: [],
  userLoginTable: {
    page: 0,
    pageSize: 5,
    sortedBy: "createdAt",
    sortOrder: "desc",
    searchText: ""
  }
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case GOT_PERSON_LIST:
      return {
        ...state,
        personCount: action.body.count,
        personMap: arrayToObjectWithId(action.body.personList),
        personIdList: action.body.personList.map(p => p.id)
      };

    case CONFIG_PERSON_TABLE:
      return {
        ...state,
        personTable: {
          ...state.personTable,
          ...action.config
        }
      };

    case GOT_CUSTOMER_LIST:
      return {
        ...state,
        customerCount: action.body.count,
        customerMap: arrayToObjectWithId(action.body.customerList),
        customerIdList: action.body.customerList.map(p => p.id)
      };

    case CONFIG_CUSTOMER_TABLE:
      return {
        ...state,
        customerTable: {
          ...state.customerTable,
          ...action.config
        }
      };

    case GOT_SEARCH_PERSON:
      return {
        ...state,
        searchPerson: action.body
      };

    case RESET_SEARCH_PERSON:
      return {
        ...state,
        searchPerson: []
      };

    case GOT_USER_LOGIN_LIST:
      return {
        ...state,
        userLoginCount: action.body.count,
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

    case LOGOUT:
      return initialState;

    default:
      return state;
  }
};

export default account;
