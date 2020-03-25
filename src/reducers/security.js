import {
  GOT_ALL_GROUPS_AND_PERMISSIONS,
  SAVED_GROUP_PERMISSIONS,
  OPEN_ADD_SECURITY_GROUP_DIALOG,
  CLOSE_ADD_SECURITY_GROUP_DIALOG,
  ADD_SECURITY_GROUP,
  ADD_SECURITY_GROUP_FAILED,
  ADDED_SECURITY_GROUP,
  USER_LOGIN_CONFIG_TABLE,
  GOT_USER_LOGIN_LIST,
  USER_LOGIN_SEARCH_TEXT,
  GOT_USER_LOGIN_INFO,
  SAVED_USER_LOGIN_GROUPS
} from "../actions/security";

import { LOGOUT } from "../actions";
import { arrayToObjectWithId } from "../util";

export const GROUP_INITIAL = 1;
export const GROUP_LOADING = 2;
export const GROUP_FAILED = 3;

export const STATE_INIT = "INIT";
export const STATE_LOADING = "LOADING";
export const STATE_FAILED = "FAILED";

const initialState = {
  securityPermissions: {},
  securityGroups: {},
  securityGroupPermissions: {},
  openAddSecurityGroupDialog: false,
  addSecurityGroupState: GROUP_INITIAL,

  userLoginMap: {},
  userLoginIdList: [],
  userLoginCount: 0,
  userLoginPage: 0,
  userLoginPageSize: 5,
  userLoginSortedBy: "createdAt",
  userLoginSortOrder: "desc",
  userLoginSearchText: "",

  permissionMap: {},
  groupMap: {},
  groupPermissions: [],
  userLoginGroups: [],
  groupIdList: []
};

const security = (state = initialState, action) => {
  switch (action.type) {
    case GOT_ALL_GROUPS_AND_PERMISSIONS:
      return {
        ...state,
        securityGroups: arrayToObjectWithId(action.body.securityGroups),
        securityPermissions: arrayToObjectWithId(
          action.body.securityPermissions
        ),
        securityGroupPermissions: action.body.securityGroupPermissions
      };

    case SAVED_GROUP_PERMISSIONS:
      return {
        ...state,
        securityGroupPermissions: action.body.securityGroupPermissions
      };

    case LOGOUT:
      return initialState;

    case OPEN_ADD_SECURITY_GROUP_DIALOG:
      return { ...state, openAddSecurityGroupDialog: true };

    case CLOSE_ADD_SECURITY_GROUP_DIALOG:
      return {
        ...state,
        openAddSecurityGroupDialog: false,
        addSecurityGroupState: GROUP_INITIAL
      };

    case ADD_SECURITY_GROUP:
      return { ...state, addSecurityGroupState: GROUP_LOADING };

    case ADDED_SECURITY_GROUP:
      return {
        ...state,
        addSecurityGroupState: GROUP_INITIAL,
        securityGroups: {
          ...state.securityGroups,
          [action.body.securityGroup.id]: action.body.securityGroup
        }
      };

    case ADD_SECURITY_GROUP_FAILED:
      return { ...state, addSecurityGroupState: GROUP_FAILED };

    case USER_LOGIN_CONFIG_TABLE:
      return {
        ...state,
        userLoginPage: action.page,
        userLoginPageSize: action.pageSize,
        userLoginSortedBy: action.sortedBy,
        userLoginSortOrder: action.sortOrder
      };

    case GOT_USER_LOGIN_LIST:
      return {
        ...state,
        userLoginCount: action.body.count,
        userLoginMap: arrayToObjectWithId(action.body.userLoginList),
        userLoginIdList: action.body.userLoginList.map(p => p.id)
      };

    case USER_LOGIN_SEARCH_TEXT:
      return {
        ...state,
        userLoginSearchText: action.text
      };

    case GOT_USER_LOGIN_INFO:
      return {
        ...state,
        groupMap: arrayToObjectWithId(action.body.groups),
        permissionMap: arrayToObjectWithId(action.body.permissions),
        groupPermissions: action.body.groupPermissions,
        groupIdList: action.body.groupIdList
      };

    case SAVED_USER_LOGIN_GROUPS:
      return {
        ...state,
        groupIdList: action.body
      };

    default:
      return state;
  }
};

export default security;
