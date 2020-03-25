import { takeEvery, put, select } from "redux-saga/effects";

import {
  apiGet,
  apiPost,
  pushSuccessNotification,
  pushErrorNotification
} from "../actions";

import {
  SAVED_GROUP_PERMISSIONS,
  ADD_SECURITY_GROUP,
  ADDED_SECURITY_GROUP,
  ADD_SECURITY_GROUP_FAILED,
  GOT_USER_LOGIN_LIST,
  closeAddSecurityGroupDialog,
  FETCH_USER_LOGIN_LIST,
  SAVED_USER_LOGIN_GROUPS
} from "../actions/security";

function* savedSecurityGroupPermissionsSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
}

function* addSecurityGroupSaga(action) {
  yield put(
    apiPost(
      "/api/security/add-security-group",
      { name: action.name },
      ADDED_SECURITY_GROUP,
      ADD_SECURITY_GROUP_FAILED
    )
  );
}

function* addedSecurityGroupSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Added sucessfully"));
  yield put(closeAddSecurityGroupDialog());
}

function* addSecurityGroupFailedSaga(action) {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushErrorNotification(sequence, `Add failed: ${action.status}!!!`));
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

  yield takeEvery(ADD_SECURITY_GROUP, addSecurityGroupSaga);
  yield takeEvery(ADDED_SECURITY_GROUP, addedSecurityGroupSaga);
  yield takeEvery(ADD_SECURITY_GROUP_FAILED, addSecurityGroupFailedSaga);

  yield takeEvery(FETCH_USER_LOGIN_LIST, fetchUserLoginListSaga);
  yield takeEvery(SAVED_USER_LOGIN_GROUPS, savedUserLoginGroupSaga);
}

export default securitySaga;
