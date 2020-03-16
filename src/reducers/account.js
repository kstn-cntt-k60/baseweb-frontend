import {
  OPEN_ADD_PARTY_DIALOG,
  CLOSE_ADD_PARTY_DIALOG,
  ADD_PARTY,
  ADDED_PARTY,
  ADD_PARTY_FAILED
} from "../actions";

export const ADD_PARTY_STATE_INIT = "INIT";
export const ADD_PARTY_STATE_LOADING = "LOADING";
export const ADD_PARTY_STATE_FAILED = "FAILED";

const initialState = {
  openAddPartyDialog: false,
  addPartyState: ADD_PARTY_STATE_INIT
};

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

    default:
      return state;
  }
};

export default account;
