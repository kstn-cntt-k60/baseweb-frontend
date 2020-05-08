import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, urlWithParams, pushSuccessNotification } from "../actions";
import {
  GOT_SALESMAN_LIST,
  FETCH_SALESMAN_LIST,
  GOT_PLANNING_LIST,
  FETCH_PLANNING_LIST,
  ADDED_PLANNING_PERIOD,
  UPDATED_PLANNING_PERIOD,
  DELETED_PLANNING_PERIOD,
  FETCH_CONFIG_LIST,
  GOT_CONFIG_LIST
} from "../actions/salesroute";

function* fetchSalesmanListSaga() {
  const config = yield select(state => state.salesroute.salesmanTable);

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
  const config = yield select(state => state.salesroute.planningTable);

  yield put(
    apiGet(
      urlWithParams("/api/sales-route/view-salesroute-planning", {
        ...config
      }),
      GOT_PLANNING_LIST
    )
  );
}

function* addedPlanningPeriodSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(
    pushSuccessNotification(sequence, "Saved Planning Period sucessfully")
  );
  yield* fetchPlanningListSaga();
}

function* updatedPlanningPeriodSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(
    pushSuccessNotification(sequence, "Update Planning Period sucessfully")
  );
  yield* fetchPlanningListSaga();
}

function* deletedPlanningPeriodSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted sucessfully"));
  yield* fetchPlanningListSaga();
}

function* fetchConfigListSaga() {
  const config = yield select(state => state.salesroute.configTable);

  yield put(
    apiGet(
      urlWithParams("/api/sales-route/view-salesroute-config", {
        ...config
      }),
      GOT_CONFIG_LIST
    )
  );
}

function* salesRouteSaga() {
  yield takeEvery(FETCH_SALESMAN_LIST, fetchSalesmanListSaga);
  yield takeEvery(FETCH_PLANNING_LIST, fetchPlanningListSaga);
  yield takeEvery(ADDED_PLANNING_PERIOD, addedPlanningPeriodSaga);
  yield takeEvery(UPDATED_PLANNING_PERIOD, updatedPlanningPeriodSaga);
  yield takeEvery(DELETED_PLANNING_PERIOD, deletedPlanningPeriodSaga);

  yield takeEvery(FETCH_CONFIG_LIST, fetchConfigListSaga);
}

export default salesRouteSaga;
