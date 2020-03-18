import { takeEvery, put, select } from "redux-saga/effects";

import {
  apiPost,
  pushSuccessNotification,
  pushErrorNotification
} from "../actions";

import {
  SAVED_GROUP_PERMISSIONS,
  ADD_SECURITY_GROUP,
  ADDED_SECURITY_GROUP,
  ADD_SECURITY_GROUP_FAILED,
  closeAddSecurityGroupDialog
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

function* securitySaga() {
  yield takeEvery(SAVED_GROUP_PERMISSIONS, savedSecurityGroupPermissionsSaga);

  yield takeEvery(ADD_SECURITY_GROUP, addSecurityGroupSaga);
  yield takeEvery(ADDED_SECURITY_GROUP, addedSecurityGroupSaga);
  yield takeEvery(ADD_SECURITY_GROUP_FAILED, addSecurityGroupFailedSaga);
}

export default securitySaga;
