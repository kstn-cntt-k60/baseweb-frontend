import {
  LOGIN,
  LOGIN_SUCEEDED,
  LOGIN_FAILED,
  LOGIN_PREVIOUS_URL,
  LOGOUT,
  LOGIN_STORAGE_CHANGED
} from "../actions";

export const STATE_INIT = 1;
export const STATE_IN_PROGRESS = 2;
export const STATE_LOGGED_IN = 3;
export const STATE_FAILED = 4;

export const initialState = {
  state: STATE_INIT,
  previousUrl: "/",
  token: null,
  securityPermissions: []
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, state: STATE_IN_PROGRESS };

    case LOGIN_SUCEEDED:
      return {
        ...state,
        state: STATE_LOGGED_IN,
        token: action.token,
        userLogin: action.userLogin,
        securityPermissions: action.securityPermissions
      };

    case LOGIN_FAILED:
      return { ...state, state: STATE_FAILED };

    case LOGIN_PREVIOUS_URL:
      return { ...state, previousUrl: action.url };

    case LOGOUT:
      return { ...initialState, previousUrl: action.previousUrl };

    case LOGIN_STORAGE_CHANGED:
      return { ...initialState, ...action.auth };

    default:
      return state;
  }
};

export default auth;
