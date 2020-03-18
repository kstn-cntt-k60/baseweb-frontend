import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import {
  LOGIN,
  loginFailed,
  loginSuceeded,
  LOGIN_SUCEEDED,
  LOGOUT,
  API_REQUEST,
  logoutAction,
  removeNotification,
  PUSH_NOTIFICATION,
  pushErrorNotification,
  pushSuccessNotification,
  SAVED_GROUP_PERMISSIONS,
  ADD_SECURITY_GROUP,
  apiGet,
  apiPost,
  ADDED_SECURITY_GROUP,
  ADD_SECURITY_GROUP_FAILED,
  closeAddSecurityGroupDialog,
  ADD_PARTY,
  ADDED_PARTY,
  ADD_PARTY_FAILED,
  FETCH_PERSON_LIST,
  GOT_PERSON_LIST,
  FETCH_CUSTOMER_LIST,
  GOT_CUSTOMER_LIST,
  UPDATE_PERSON,
  UPDATED_PERSON,
  UPDATE_PERSON_FAILED,
  DELETED_PERSON,
  closeYesNoDialog
} from "../actions";
import { apiLogin } from "./api";

function* loginSaga(action) {
  const response = yield call(apiLogin, action.username, action.password);

  if (response.status === 401) {
    yield put(loginFailed());
  } else if (response.status === 200) {
    const token = response.headers.get("X-Auth-Token");
    const body = yield call(() => response.json());
    yield put(loginSuceeded(token, body.userLogin, body.securityPermissions));
  } else {
    console.log("SERVER PROBLEM!!!");
  }
}

function* loginSuceededSaga(action) {
  const auth = {
    token: action.token,
    userLogin: action.userLogin,
    securityPermissions: action.securityPermissions
  };

  yield call(() => localStorage.setItem("auth", JSON.stringify(auth)));
}

function* logoutSaga() {
  yield call(() => localStorage.removeItem("auth"));
}

function* apiRequestSaga(action) {
  const token = yield select(state => state.auth.token);

  const options = {
    method: action.method,
    headers: {
      "X-Auth-Token": token
    }
  };
  const body = JSON.stringify(action.body);

  const postOptions = {
    ...options,
    body,
    headers: { ...options.headers, "Content-Type": "application/json" }
  };
  const response = yield call(
    fetch,
    action.url,
    action.method === "POST" ? postOptions : options
  );

  if (response.status === 401) {
    const previousUrl = yield select(state => state.auth.previousUrl);
    yield put(logoutAction(previousUrl));
  } else if (response.status === 200) {
    const json = yield call(() => response.json());
    yield put({ type: action.actionType, body: json });
  } else {
    console.log(action.errorActionType);
    if (action.errorActionType) {
      yield put({ type: action.errorActionType, status: response.status });
    } else {
      const sequence = yield select(state => state.notifications.sequence);
      yield put(
        pushErrorNotification(sequence, `Request error: ${response.status}!!!`)
      );
    }
  }
}

function* pushNotificationSaga(action) {
  yield delay(10000);
  yield put(removeNotification(action.id));
}

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

function* addPartySaga(action) {
  yield put(
    apiPost(
      "/api/account/add-party",
      action.body,
      ADDED_PARTY,
      ADD_PARTY_FAILED
    )
  );
}

function* addedPartySaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Add successfully!!!"));
  yield* fetchPersonListSaga();
  yield* fetchCustomerListSaga();
}

function* addPartyFailedSaga(action) {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushErrorNotification(sequence, `Add failed: ${action.status}!!!`));
}

function* fetchPersonListSaga() {
  const page = yield select(state => state.account.personPage);
  const pageSize = yield select(state => state.account.personPageSize);
  const sortedBy = yield select(state => state.account.personSortedBy);
  const sortOrder = yield select(state => state.account.personSortOrder);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}`;
  yield put(apiGet(`/api/account/view-person?${query}`, GOT_PERSON_LIST));
}

function* fetchCustomerListSaga() {
  const page = yield select(state => state.account.customerPage);
  const pageSize = yield select(state => state.account.customerPageSize);
  const sortedBy = yield select(state => state.account.customerSortedBy);
  const sortOrder = yield select(state => state.account.customerSortOrder);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}`;
  yield put(apiGet(`/api/account/view-customer?${query}`, GOT_CUSTOMER_LIST));
}

function* updatePersonSaga(action) {
  yield put(
    apiPost(
      "/api/account/update-person",
      action.body,
      UPDATED_PERSON,
      UPDATE_PERSON_FAILED
    )
  );
}

function* updatedPersonSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved successfully!!!"));
  yield* fetchPersonListSaga();
}

function* deletedPersonSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted successfully!!!"));
  yield put(closeYesNoDialog());
  yield* fetchPersonListSaga();
}

function* rootSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGIN_SUCEEDED, loginSuceededSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(API_REQUEST, apiRequestSaga);
  yield takeEvery(PUSH_NOTIFICATION, pushNotificationSaga);

  yield takeEvery(SAVED_GROUP_PERMISSIONS, savedSecurityGroupPermissionsSaga);

  yield takeEvery(ADD_SECURITY_GROUP, addSecurityGroupSaga);
  yield takeEvery(ADDED_SECURITY_GROUP, addedSecurityGroupSaga);
  yield takeEvery(ADD_SECURITY_GROUP_FAILED, addSecurityGroupFailedSaga);

  yield takeEvery(ADD_PARTY, addPartySaga);
  yield takeEvery(ADDED_PARTY, addedPartySaga);
  yield takeEvery(ADD_PARTY_FAILED, addPartyFailedSaga);

  yield takeEvery(FETCH_PERSON_LIST, fetchPersonListSaga);
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);

  yield takeEvery(UPDATE_PERSON, updatePersonSaga);
  yield takeEvery(UPDATED_PERSON, updatedPersonSaga);
  yield takeEvery(DELETED_PERSON, deletedPersonSaga);
}

export default rootSaga;
