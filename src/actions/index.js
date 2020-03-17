export const LOGIN = "LOGIN";
export const LOGIN_SUCEEDED = "LOGIN_SUCEEDED";
export const LOGIN_FAILED = "LOGIN_FAILED";
export const LOGIN_PREVIOUS_URL = "LOGIN_PREVIOUS_URL";
export const LOGOUT = "LOGOUT";
export const LOGIN_STORAGE_CHANGED = "LOGIN_STORAGE_CHANGED";

export const API_REQUEST = "API_REQUEST";

export const PUSH_NOTIFICATION = "PUSH_NOTIFICATION";
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION";

export const GOT_ALL_GROUPS_AND_PERMISSIONS = "GOT_ALL_GROUPS_AND_PERMISSIONS";
export const SAVED_GROUP_PERMISSIONS = "SAVED_GROUP_PERMISSIONS";

export const OPEN_ADD_SECURITY_GROUP_DIALOG = "OPEN_ADD_SECURITY_GROUP_DIALOG";
export const CLOSE_ADD_SECURITY_GROUP_DIALOG =
  "CLOSE_ADD_SECURITY_GROUP_DIALOG";

export const ADD_SECURITY_GROUP = "ADD_SECURITY_GROUP";
export const ADDED_SECURITY_GROUP = "ADDED_SECURITY_GROUP";
export const ADD_SECURITY_GROUP_FAILED = "ADD_SECURITY_GROUP_FAILED";

export const OPEN_ADD_PARTY_DIALOG = "OPEN_ADD_PARTY_DIALOG";
export const CLOSE_ADD_PARTY_DIALOG = "CLOSE_ADD_PARTY_DIALOG";

export const ADD_PARTY = "ADD_PARTY";
export const ADDED_PARTY = "ADDED_PARTY";
export const ADD_PARTY_FAILED = "ADD_PARTY_FAILED";

export const FETCH_PERSON_LIST = "FETCH_PERSON_LIST";
export const GOT_PERSON_LIST = "GOT_PERSON_LIST";
export const PERSON_CONFIG_TABLE = "PERSON_CONFIG_TABLE";

export const FETCH_CUSTOMER_LIST = "FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "GOT_CUSTOMER_LIST";
export const CUSTOMER_CONFIG_TABLE = "CUSTOMER_CONFIG_TABLE";

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

export const openAddSecurityGroupDialog = () => ({
  type: OPEN_ADD_SECURITY_GROUP_DIALOG
});

export const closeAddSecurityGroupDialog = () => ({
  type: CLOSE_ADD_SECURITY_GROUP_DIALOG
});

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

export const addSecurityGroup = name => ({
  type: ADD_SECURITY_GROUP,
  name
});

export const openAddPartyDialog = () => ({
  type: OPEN_ADD_PARTY_DIALOG
});

export const closeAddPartyDialog = () => ({
  type: CLOSE_ADD_PARTY_DIALOG
});

export const addParty = body => ({
  type: ADD_PARTY,
  body
});

export const fetchPersonList = () => ({
  type: FETCH_PERSON_LIST
});

export const personConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: PERSON_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const customerConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: CUSTOMER_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});
