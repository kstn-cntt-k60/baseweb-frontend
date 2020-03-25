export const GOT_ALL_GROUPS_AND_PERMISSIONS = "GOT_ALL_GROUPS_AND_PERMISSIONS";
export const SAVED_GROUP_PERMISSIONS = "SAVED_GROUP_PERMISSIONS";

export const OPEN_ADD_SECURITY_GROUP_DIALOG = "OPEN_ADD_SECURITY_GROUP_DIALOG";
export const CLOSE_ADD_SECURITY_GROUP_DIALOG =
  "CLOSE_ADD_SECURITY_GROUP_DIALOG";

export const ADD_SECURITY_GROUP = "ADD_SECURITY_GROUP";
export const ADDED_SECURITY_GROUP = "ADDED_SECURITY_GROUP";
export const ADD_SECURITY_GROUP_FAILED = "ADD_SECURITY_GROUP_FAILED";

export const FETCH_USER_LOGIN_LIST = "security/FETCH_USER_LOGIN_LIST";
export const GOT_USER_LOGIN_LIST = "security/GOT_USER_LOGIN_LIST";
export const USER_LOGIN_CONFIG_TABLE = "security/USER_LOGIN_CONFIG_TABLE";
export const USER_LOGIN_SEARCH_TEXT = "security/USER_LOGIN_SEARCH_TEXT";
export const GOT_USER_LOGIN_INFO = "security/GOT_USER_LOGIN_INFO";
export const SAVED_USER_LOGIN_GROUPS = "security/SAVED_USER_LOGIN_GROUPS";

export const openAddSecurityGroupDialog = () => ({
  type: OPEN_ADD_SECURITY_GROUP_DIALOG
});

export const closeAddSecurityGroupDialog = () => ({
  type: CLOSE_ADD_SECURITY_GROUP_DIALOG
});

export const addSecurityGroup = name => ({
  type: ADD_SECURITY_GROUP,
  name
});

export const fetchUserLoginList = () => ({
  type: FETCH_USER_LOGIN_LIST
});

export const userLoginSearchText = text => ({
  type: USER_LOGIN_SEARCH_TEXT,
  text
});

export const userLoginConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: USER_LOGIN_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});
