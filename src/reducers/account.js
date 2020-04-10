import {
  GOT_PERSON_LIST,
  PERSON_CONFIG_TABLE,
  GOT_CUSTOMER_LIST,
  CUSTOMER_CONFIG_TABLE,
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
  personPage: 0,
  personPageSize: 5,
  personSortedBy: "createdAt",
  personSortOrder: "desc",

  customerCount: 0,
  customerMap: {},
  customerIdList: [],
  customerPage: 0,
  customerPageSize: 5,
  customerSortedBy: "createdAt",
  customerSortOrder: "desc",

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

    case PERSON_CONFIG_TABLE:
      return {
        ...state,
        personPage: action.page,
        personPageSize: action.pageSize,
        personSortedBy: action.sortedBy,
        personSortOrder: action.sortOrder
      };

    case GOT_CUSTOMER_LIST:
      return {
        ...state,
        customerCount: action.body.count,
        customerMap: arrayToObjectWithId(action.body.customerList),
        customerIdList: action.body.customerList.map(p => p.id)
      };

    case CUSTOMER_CONFIG_TABLE:
      return {
        ...state,
        customerPage: action.page,
        customerPageSize: action.pageSize,
        customerSortedBy: action.sortedBy,
        customerSortOrder: action.sortOrder
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
