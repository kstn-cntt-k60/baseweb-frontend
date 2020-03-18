import { takeEvery, put, select } from "redux-saga/effects";

import {
  apiGet,
  apiPost,
  pushSuccessNotification,
  pushErrorNotification,
  closeYesNoDialog
} from "../actions";

import {
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
  UPDATE_CUSTOMER,
  UPDATED_CUSTOMER,
  UPDATE_CUSTOMER_FAILED,
  DELETED_PERSON,
  DELETED_CUSTOMER
} from "../actions/account";
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

function* updateCustomerSaga(action) {
  yield put(
    apiPost(
      "/api/account/update-customer",
      action.body,
      UPDATED_CUSTOMER,
      UPDATE_CUSTOMER_FAILED
    )
  );
}

function* updatedCustomerSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved successfully!!!"));
  yield* fetchCustomerListSaga();
}

function* deletedCustomerSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted successfully!!!"));
  yield put(closeYesNoDialog());
  yield* fetchCustomerListSaga();
}

function* accountSaga() {
  yield takeEvery(ADD_PARTY, addPartySaga);
  yield takeEvery(ADDED_PARTY, addedPartySaga);
  yield takeEvery(ADD_PARTY_FAILED, addPartyFailedSaga);

  yield takeEvery(FETCH_PERSON_LIST, fetchPersonListSaga);
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);

  yield takeEvery(UPDATE_PERSON, updatePersonSaga);
  yield takeEvery(UPDATED_PERSON, updatedPersonSaga);
  yield takeEvery(DELETED_PERSON, deletedPersonSaga);

  yield takeEvery(UPDATE_CUSTOMER, updateCustomerSaga);
  yield takeEvery(UPDATED_CUSTOMER, updatedCustomerSaga);

  yield takeEvery(DELETED_CUSTOMER, deletedCustomerSaga);
}

export default accountSaga;
