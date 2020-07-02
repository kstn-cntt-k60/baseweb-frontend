import { takeEvery, put, select } from "redux-saga/effects";

import {
  apiGet,
  urlWithParams,
  pushSuccessNotification,
  pushErrorNotification
} from "../actions";
import {
  GOT_SALESMAN_LIST,
  FETCH_SALESMAN_LIST,
  GOT_PLANNING_LIST,
  FETCH_PLANNING_LIST,
  ADDED_PLANNING_PERIOD,
  UPDATED_PLANNING_PERIOD,
  DELETED_PLANNING_PERIOD,
  FETCH_CONFIG_LIST,
  GOT_CONFIG_LIST,
  ADDED_CONFIG,
  UPDATED_CONFIG,
  DELETED_CONFIG,
  FIND_STORE_OF_SALESMAN,
  FAILED_FIND_STORE_OF_SALESMAN
} from "../actions/salesroute";
import { DELETED_SALESMAN } from "../actions/salesman";
import {
  FETCH_PAIR_STORE_SALESMAN,
  fetchPairStoreSalesman,
  GOT_PAIR_STORE_SALESMAN
} from "../actions/facility";

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

function* addedConfigSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved Config sucessfully"));
  yield* fetchConfigListSaga();
}

function* updatedConfigSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Updated Config sucessfully"));
  yield* fetchConfigListSaga();
}

function* deletedConfigSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Delete Config sucessfully"));
  yield* fetchConfigListSaga();
}

function* deletedSalesmanSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Delete Salesman sucessfully"));
  yield* fetchSalesmanListSaga();
}

function* findStoreOfSalesmanSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(
    pushSuccessNotification(sequence, "Get Store Of Salesman sucessfully")
  );
}

function* failedFindStoreOfSalesmanSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushErrorNotification(sequence, "Get Store Of Salesman Failed!"));
}

function* fetchPairStoreSalesmanSaga() {
  yield put(
    apiGet("/api/sales-route/get-pair-store-salesman", GOT_PAIR_STORE_SALESMAN)
  );
}

function* salesRouteSaga() {
  yield takeEvery(FETCH_SALESMAN_LIST, fetchSalesmanListSaga);
  yield takeEvery(FETCH_PLANNING_LIST, fetchPlanningListSaga);
  yield takeEvery(ADDED_PLANNING_PERIOD, addedPlanningPeriodSaga);
  yield takeEvery(UPDATED_PLANNING_PERIOD, updatedPlanningPeriodSaga);
  yield takeEvery(DELETED_PLANNING_PERIOD, deletedPlanningPeriodSaga);

  yield takeEvery(FETCH_CONFIG_LIST, fetchConfigListSaga);
  yield takeEvery(ADDED_CONFIG, addedConfigSaga);
  yield takeEvery(UPDATED_CONFIG, updatedConfigSaga);
  yield takeEvery(DELETED_CONFIG, deletedConfigSaga);
  yield takeEvery(DELETED_SALESMAN, deletedSalesmanSaga);

  yield takeEvery(FIND_STORE_OF_SALESMAN, findStoreOfSalesmanSaga);
  yield takeEvery(FAILED_FIND_STORE_OF_SALESMAN, failedFindStoreOfSalesmanSaga);
  yield takeEvery(FETCH_PAIR_STORE_SALESMAN, fetchPairStoreSalesmanSaga);
}

export default salesRouteSaga;
