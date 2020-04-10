import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, pushSuccessNotification, urlWithParams } from "../actions";

import {
  ADDED_PARTY,
  FETCH_PERSON_LIST,
  GOT_PERSON_LIST,
  FETCH_CUSTOMER_LIST,
  GOT_CUSTOMER_LIST,
  UPDATED_PERSON,
  DELETED_PERSON,
  UPDATED_CUSTOMER,
  DELETED_CUSTOMER,
  ADDED_USER_LOGIN,
  FETCH_USER_LOGIN_LIST,
  GOT_USER_LOGIN_LIST,
  UPDATED_USER_LOGIN,
  DELETED_USER_LOGIN
} from "../actions/account";

function* addedPartySaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Add successfully!!!"));
  yield* fetchPersonListSaga();
  yield* fetchCustomerListSaga();
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

function* updatedPersonSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved successfully!!!"));
  yield* fetchPersonListSaga();
}

function* deletedPersonSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted successfully!!!"));
  yield* fetchPersonListSaga();
}

function* updatedCustomerSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved successfully!!!"));
  yield* fetchCustomerListSaga();
}

function* deletedCustomerSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted successfully!!!"));
  yield* fetchCustomerListSaga();
}

function* addedUserLoginSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Added successfully!!!"));
  yield* fetchUserLoginListSaga();
}

function* fetchUserLoginListSaga() {
  const config = yield select(state => state.account.userLoginTable);

  yield put(
    apiGet(
      urlWithParams("/api/account/view-user-login", {
        ...config,
        query: config.searchText
      }),
      GOT_USER_LOGIN_LIST
    )
  );
}

function* updatedUserLoginSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved successfully!!!"));
  yield* fetchUserLoginListSaga();
}

function* deletedUserLoginSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted successfully!!!"));
  yield* fetchUserLoginListSaga();
}

function* accountSaga() {
  yield takeEvery(ADDED_PARTY, addedPartySaga);

  yield takeEvery(FETCH_PERSON_LIST, fetchPersonListSaga);
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);

  yield takeEvery(UPDATED_PERSON, updatedPersonSaga);
  yield takeEvery(DELETED_PERSON, deletedPersonSaga);

  yield takeEvery(UPDATED_CUSTOMER, updatedCustomerSaga);
  yield takeEvery(DELETED_CUSTOMER, deletedCustomerSaga);

  yield takeEvery(ADDED_USER_LOGIN, addedUserLoginSaga);
  yield takeEvery(FETCH_USER_LOGIN_LIST, fetchUserLoginListSaga);
  yield takeEvery(UPDATED_USER_LOGIN, updatedUserLoginSaga);
  yield takeEvery(DELETED_USER_LOGIN, deletedUserLoginSaga);
}

export default accountSaga;
