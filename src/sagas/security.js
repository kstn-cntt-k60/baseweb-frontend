import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, pushSuccessNotification } from "../actions";

import {
  SAVED_GROUP_PERMISSIONS,
  ADDED_SECURITY_GROUP,
  GOT_USER_LOGIN_LIST,
  FETCH_USER_LOGIN_LIST,
  SAVED_USER_LOGIN_GROUPS
} from "../actions/security";

function* savedSecurityGroupPermissionsSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
}

function* addedSecurityGroupSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Added sucessfully"));
}

function* fetchUserLoginListSaga() {
  const page = yield select(state => state.security.userLoginPage);
  const pageSize = yield select(state => state.security.userLoginPageSize);
  const sortedBy = yield select(state => state.security.userLoginSortedBy);
  const sortOrder = yield select(state => state.security.userLoginSortOrder);
  const text = yield select(state => state.security.userLoginSearchText);
  const searchText = encodeURIComponent(text);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}&query=${searchText}`;
  yield put(
    apiGet(`/api/account/view-user-login?${query}`, GOT_USER_LOGIN_LIST)
  );
}

function* savedUserLoginGroupSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
}

function* securitySaga() {
  yield takeEvery(SAVED_GROUP_PERMISSIONS, savedSecurityGroupPermissionsSaga);

  yield takeEvery(ADDED_SECURITY_GROUP, addedSecurityGroupSaga);
  yield takeEvery(FETCH_USER_LOGIN_LIST, fetchUserLoginListSaga);
  yield takeEvery(SAVED_USER_LOGIN_GROUPS, savedUserLoginGroupSaga);
}

export default securitySaga;
