import {
  OPEN_ADD_PARTY_DIALOG,
  CLOSE_ADD_PARTY_DIALOG,
  ADD_PARTY,
  ADDED_PARTY,
  ADD_PARTY_FAILED,
  GOT_PERSON_LIST,
  PERSON_CONFIG_TABLE
} from "../actions";

import { arrayToObjectWithId } from "../util";

export const ADD_PARTY_STATE_INIT = "INIT";
export const ADD_PARTY_STATE_LOADING = "LOADING";
export const ADD_PARTY_STATE_FAILED = "FAILED";

const initialState = {
  openAddPartyDialog: false,
  addPartyState: ADD_PARTY_STATE_INIT,
  personCount: 0,
  personMap: {},
  personIdList: [],
  personPage: 0,
  personPageSize: 5,
  personSortedBy: "createdAt",
  personSortOrder: "desc"
};

const personListToObject = personList =>
  arrayToObjectWithId(
    personList.map(p => ({
      ...p,
      birthDate: new Date(p.birthDate),
      createdAt: new Date(p.createdAt),
      updatedAt: new Date(p.createdAt)
    }))
  );

const account = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_ADD_PARTY_DIALOG:
      return { ...state, openAddPartyDialog: true };

    case CLOSE_ADD_PARTY_DIALOG:
      return { ...state, openAddPartyDialog: false };

    case ADD_PARTY:
      return { ...state, addPartyState: ADD_PARTY_STATE_LOADING };

    case ADDED_PARTY:
      return { ...state, addPartyState: ADD_PARTY_STATE_INIT };

    case ADD_PARTY_FAILED:
      return { ...state, addPartyState: ADD_PARTY_STATE_FAILED };

    case GOT_PERSON_LIST:
      return {
        ...state,
        personCount: action.body.count,
        personMap: personListToObject(action.body.personList),
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

    default:
      return state;
  }
};

export default account;
