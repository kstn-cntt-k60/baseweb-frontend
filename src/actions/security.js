export const GOT_ALL_GROUPS_AND_PERMISSIONS = "GOT_ALL_GROUPS_AND_PERMISSIONS";
export const SAVED_GROUP_PERMISSIONS = "SAVED_GROUP_PERMISSIONS";

export const ADDED_SECURITY_GROUP = "ADDED_SECURITY_GROUP";

export const FETCH_USER_LOGIN_LIST = "security/FETCH_USER_LOGIN_LIST";
export const GOT_USER_LOGIN_LIST = "security/GOT_USER_LOGIN_LIST";

export const USER_LOGIN_CONFIG_TABLE = "security/USER_LOGIN_CONFIG_TABLE";
export const USER_LOGIN_SEARCH_TEXT = "security/USER_LOGIN_SEARCH_TEXT";

export const GOT_USER_LOGIN_INFO = "security/GOT_USER_LOGIN_INFO";
export const SAVED_USER_LOGIN_GROUPS = "security/SAVED_USER_LOGIN_GROUPS";

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
