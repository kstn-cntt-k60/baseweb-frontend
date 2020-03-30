import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, pushSuccessNotification } from "../actions";

import {
  FETCH_WAREHOUSE_LIST,
  GOT_WAREHOUSE_LIST,
  ADDED_WAREHOUSE,
  UPDATED_WAREHOUSE,
  DELETED_WAREHOUSE
} from "../actions/facility";

function* fetchWarehouseListSaga() {
  const page = yield select(state => state.facility.warehousePage);
  const pageSize = yield select(state => state.facility.warehousePageSize);
  const sortedBy = yield select(state => state.facility.warehouseSortedBy);
  const sortOrder = yield select(state => state.facility.warehouseSortOrder);
  const text = yield select(state => state.facility.warehouseSearchText);
  const searchText = encodeURIComponent(text);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}&query=${searchText}`;
  yield put(
    apiGet(`/api/facility/view-warehouse?${query}`, GOT_WAREHOUSE_LIST)
  );
}

function* addedWarehouseSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
  yield* fetchWarehouseListSaga();
}

function* updatedWarehouseSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
  yield* fetchWarehouseListSaga();
}

function* deletedWarehouseSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted sucessfully"));
  yield* fetchWarehouseListSaga();
}

function* facilitySaga() {
  yield takeEvery(FETCH_WAREHOUSE_LIST, fetchWarehouseListSaga);
  yield takeEvery(ADDED_WAREHOUSE, addedWarehouseSaga);
  yield takeEvery(UPDATED_WAREHOUSE, updatedWarehouseSaga);
  yield takeEvery(DELETED_WAREHOUSE, deletedWarehouseSaga);
}

export default facilitySaga;
