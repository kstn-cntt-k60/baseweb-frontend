import {
  OPEN_ADD_PARTY_DIALOG,
  CLOSE_ADD_PARTY_DIALOG,
  OPEN_EDIT_PERSON_DIALOG,
  CLOSE_EDIT_PERSON_DIALOG,
  ADD_PARTY,
  ADDED_PARTY,
  ADD_PARTY_FAILED,
  UPDATE_PERSON,
  UPDATED_PERSON,
  UPDATE_PERSON_FAILED,
  UPDATE_CUSTOMER,
  UPDATED_CUSTOMER,
  UPDATE_CUSTOMER_FAILED,
  GOT_PERSON_LIST,
  PERSON_CONFIG_TABLE,
  GOT_CUSTOMER_LIST,
  CUSTOMER_CONFIG_TABLE,
  OPEN_EDIT_CUSTOMER_DIALOG,
  CLOSE_EDIT_CUSTOMER_DIALOG
} from "../actions/account";

import { arrayToObjectWithId } from "../util";

export const STATE_INIT = "INIT";
export const STATE_LOADING = "LOADING";
export const STATE_FAILED = "FAILED";

const initialState = {
  openAddPartyDialog: false,
  addPartyState: STATE_INIT,

  openEditPersonDialog: false,
  editPersonState: STATE_INIT,
  editPersonId: null,

  openEditCustomerDialog: false,
  editCustomerState: STATE_INIT,
  editCustomerId: null,

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
  customerSortOrder: "desc"
};

const account = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_PARTY_DIALOG:
      return { ...state, openAddPartyDialog: true };

    case CLOSE_ADD_PARTY_DIALOG:
      return { ...state, openAddPartyDialog: false };

    case OPEN_EDIT_PERSON_DIALOG:
      return { ...state, openEditPersonDialog: true, editPersonId: action.id };

    case CLOSE_EDIT_PERSON_DIALOG:
      return { ...state, openEditPersonDialog: false };

    case OPEN_EDIT_CUSTOMER_DIALOG:
      return {
        ...state,
        openEditCustomerDialog: true,
        editCustomerId: action.id
      };

    case CLOSE_EDIT_CUSTOMER_DIALOG:
      return { ...state, openEditCustomerDialog: false };

    case ADD_PARTY:
      return { ...state, addPartyState: STATE_LOADING };

    case ADDED_PARTY:
      return { ...state, addPartyState: STATE_INIT };

    case ADD_PARTY_FAILED:
      return { ...state, addPartyState: STATE_FAILED };

    case UPDATE_PERSON:
      return {
        ...state,
        editPersonState: STATE_LOADING
      };

    case UPDATED_PERSON:
      return {
        ...state,
        editPersonState: STATE_INIT
      };

    case UPDATE_PERSON_FAILED:
      return {
        ...state,
        editPersonState: STATE_FAILED
      };

    case UPDATE_CUSTOMER:
      return {
        ...state,
        editCustomerState: STATE_LOADING
      };

    case UPDATED_CUSTOMER:
      return {
        ...state,
        editCustomerState: STATE_INIT
      };

    case UPDATE_CUSTOMER_FAILED:
      return {
        ...state,
        editCustomerState: STATE_FAILED
      };

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

    default:
      return state;
  }
};

export default account;
