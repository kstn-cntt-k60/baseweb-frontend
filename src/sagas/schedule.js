import { takeEvery, put, select } from "redux-saga/effects";
import {
  apiGet,
  urlWithParams,
  pushSuccessNotification,
  pushErrorNotification
} from "../actions";

import {
  FETCH_SALESMAN_LIST,
  FETCH_PLANNING_LIST,
  FETCH_CONFIG_LIST,
  GOT_SALESMAN_LIST,
  GOT_PLANNING_LIST,
  GOT_CONFIG_LIST,
  GOT_CUSTOMER_LIST,
  FETCH_CUSTOMER_LIST,
  ADD_SCHEDULE_FAILED,
  ADDED_SCHEDULE,
  FETCH_SCHEDULE_LIST,
  GOT_SCHEDULE_LIST,
  DELETED_SCHEDULE
} from "../actions/schedule";
import { ADDED_CONFIG } from "../actions/salesroute";

function* fetchSalesmanListSaga() {
  const config = yield select(state => state.schedule.salesmanTable);

  yield put(
    apiGet(
      urlWithParams("/api/sales-route/view-salesman", {
        ...config
      }),
      GOT_SALESMAN_LIST
    )
  );
}

function* fetchPlanningListSaga() {
  const config = yield select(state => state.schedule.planningTable);

  yield put(
    apiGet(
      urlWithParams("/api/sales-route/view-salesroute-planning", {
        ...config
      }),
      GOT_PLANNING_LIST
    )
  );
}

function* fetchConfigListSaga() {
  const config = yield select(state => state.schedule.configTable);

  yield put(
    apiGet(
      urlWithParams("/api/sales-route/view-salesroute-config", {
        ...config
      }),
      GOT_CONFIG_LIST
    )
  );
}

function* fetchCustomerListSaga() {
  const config = yield select(state => state.schedule.customerTable);
  yield put(
    apiGet(
      urlWithParams("/api/account/view-customer", config),
      GOT_CUSTOMER_LIST
    )
  );
}

function* addedConfigSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved Config sucessfully"));
  yield* fetchConfigListSaga();
}

function* addedScheduleSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Add Schedule sucessfully"));
}

function* addScheduleFailedSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushErrorNotification(sequence, "Duplicated schedule!!"));
}

function* fetchScheduleListSaga() {
  const config = yield select(state => state.schedule.scheduleTable);
  yield put(
    apiGet(
      urlWithParams("/api/schedule/view-schedule", config),
      GOT_SCHEDULE_LIST
    )
  );
}

function* deletedScheduleSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Delete Schedule sucessfully"));
  yield* fetchScheduleListSaga();
}

function* scheduleSaga() {
  yield takeEvery(FETCH_SALESMAN_LIST, fetchSalesmanListSaga);
  yield takeEvery(FETCH_PLANNING_LIST, fetchPlanningListSaga);
  yield takeEvery(FETCH_CONFIG_LIST, fetchConfigListSaga);
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);

  yield takeEvery(ADDED_CONFIG, addedConfigSaga);
  yield takeEvery(ADD_SCHEDULE_FAILED, addScheduleFailedSaga);
  yield takeEvery(ADDED_SCHEDULE, addedScheduleSaga);
  yield takeEvery(DELETED_SCHEDULE, deletedScheduleSaga);

  yield takeEvery(FETCH_SCHEDULE_LIST, fetchScheduleListSaga);
}

export default scheduleSaga;
