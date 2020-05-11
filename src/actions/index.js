export const LOGIN = "LOGIN";
export const LOGIN_SUCEEDED = "LOGIN_SUCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_PREVIOUS_URL = "LOGIN_PREVIOUS_URL";
export const LOGOUT = "LOGOUT";
export const LOGIN_STORAGE_CHANGED = "LOGIN_STORAGE_CHANGED";

export const API_REQUEST = "API_REQUEST";

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const loginAction = (username, password) => ({
  type: LOGIN,
  username,
  password
});

export const loginSuceeded = (token, userLogin, securityPermissions) => ({
  type: LOGIN_SUCEEDED,
  token,
  userLogin,
  securityPermissions
});

export const loginFailed = () => ({
  type: LOGIN_FAILED
});

export const loginPreviousUrl = url => ({
  type: LOGIN_PREVIOUS_URL,
  url
});

export const logoutAction = (previousUrl = "/") => ({
  type: LOGOUT,
  previousUrl
});

export const loginStorageChanged = auth => ({
  type: LOGIN_STORAGE_CHANGED,
  auth
});

export const apiRequest = (url, method, body, actionType, errorActionType) => ({
  type: API_REQUEST,
  url,
  method,
  body,
  actionType,
  errorActionType
});

export const apiGet = (url, actionType, errorActionType = null) =>
  apiRequest(url, "GET", null, actionType, errorActionType);

export const apiPost = (url, body, actionType, errorActionType = null) =>
  apiRequest(url, "POST", body, actionType, errorActionType);

export const pushSuccessNotification = (id, message) => ({
  type: PUSH_NOTIFICATION,
  id,
  severity: "success",
  message
});

export const pushErrorNotification = (id, message) => ({
  type: PUSH_NOTIFICATION,
  id,
  severity: "error",
  message
});

export const removeNotification = id => ({
  type: REMOVE_NOTIFICATION,
  id
});

export const urlWithParams = (url, params) => {
  const query = Object.entries(params)
    .map(([key, value]) => {
      key = encodeURIComponent(key);
      value = encodeURIComponent(value);
      return `${key}=${value}`;
    })
    .join("&");
  return `${url}?${query}`;
};
