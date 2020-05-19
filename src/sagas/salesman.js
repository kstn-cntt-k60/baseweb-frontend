import { takeEvery, put, select, delay } from "redux-saga/effects";

import {
  apiGet,
  pushSuccessNotification,
  urlWithParams,
  pushErrorNotification
} from "../actions";
import {
  FETCH_USER_LOGIN_LIST,
  GOT_USER_LOGIN_LIST,
  ADDED_SALESMAN,
  FETCH_SCHEDULE_LIST,
  GOT_SCHEDULE_LIST,
  ADDED_CHECKIN,
  ADD_CHECKIN_FAILED,
  FETCH_PLANNING_LIST,
  GOT_PLANNING_LIST,
  FETCH_CUSTOMER_LIST,
  GOT_CUSTOMER_LIST,
  FETCH_CHECKIN_HISTORY_LIST,
  GOT_CHECKIN_HISTORY_LIST
} from "../actions/salesman";

function* fetchUserLoginListSaga() {
  const config = yield select(state => state.schedule.salesmanTable);

  yield put(
    apiGet(
      urlWithParams("/api/salesman/view-user-login", {
        ...config
      }),
      GOT_USER_LOGIN_LIST
    )
  );
}

function* addedSalesmanSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield delay(500);
  yield put(pushSuccessNotification(sequence, "Add Salesman sucessfully"));
  yield* fetchUserLoginListSaga();
}

function* fetchScheduleListSaga() {
  const config = yield select(state => state.salesman.scheduleTable);

  yield put(
    apiGet(
      urlWithParams("/api/salesman/view-schedule", {
        ...config
      }),
      GOT_SCHEDULE_LIST
    )
  );
}

function* addedCheckinSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Checkin sucessfully"));
}

function* addCheckinFailedSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushErrorNotification(sequence, "Checkin failed"));
}

function* fetchPlanningListSaga() {
  const config = yield select(state => state.salesman.planningTable);

  yield put(
    apiGet(
      urlWithParams("/api/salesman/view-planning", {
        ...config
      }),
      GOT_PLANNING_LIST
    )
  );
}

function* fetchCustomerListSaga() {
  const config = yield select(state => state.salesman.customerTable);
  yield put(
    apiGet(
      urlWithParams("/api/salesman/view-customer", config),
      GOT_CUSTOMER_LIST
    )
  );
}

function* fetchCheckinHistoryListSaga() {
  const config = yield select(state => state.salesman.checkinTable);
  yield put(
    apiGet(
      urlWithParams("/api/salesman/view-checkin-history", config),
      GOT_CHECKIN_HISTORY_LIST
    )
  );
}

function* salesmanSaga() {
  yield takeEvery(FETCH_USER_LOGIN_LIST, fetchUserLoginListSaga);
  yield takeEvery(ADDED_SALESMAN, addedSalesmanSaga);
  yield takeEvery(FETCH_SCHEDULE_LIST, fetchScheduleListSaga);
  yield takeEvery(ADDED_CHECKIN, addedCheckinSaga);
  yield takeEvery(ADD_CHECKIN_FAILED, addCheckinFailedSaga);

  yield takeEvery(FETCH_PLANNING_LIST, fetchPlanningListSaga);
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);
  yield takeEvery(FETCH_CHECKIN_HISTORY_LIST, fetchCheckinHistoryListSaga);
}

export default salesmanSaga;
