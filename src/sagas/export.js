import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, urlWithParams, pushSuccessNotification } from "../actions";

import {
  fetchSingleOrder,
  FETCH_EXPORTABLE_ORDER_LIST,
  GOT_EXPORTABLE_ORDER_LIST,
  FETCH_COMPLETED_ORDER_LIST,
  GOT_COMPLETED_ORDER_LIST,
  EXPORTED_ORDER_ITEM,
  COMPLETED_ORDER
} from "../actions/export";

function* fetchExportableOrderListSaga() {
  const config = yield select(state => state.export.exportableOrderTable);

  yield put(
    apiGet(
      urlWithParams("/api/export/view-exportable-sales-order", config),
      GOT_EXPORTABLE_ORDER_LIST
    )
  );
}

function* fetchCompletedOrderListSaga() {
  const config = yield select(state => state.export.completedOrderTable);

  yield put(
    apiGet(
      urlWithParams("/api/export/view-completed-sales-order", config),
      GOT_COMPLETED_ORDER_LIST
    )
  );
}

function* exportedOrderItemSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Export sucessfully"));

  const orderId = yield select(state => state.export.currentOrder.id);
  yield put(fetchSingleOrder(orderId));
}

function* completedOrderSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Complete order sucessfully"));

  const orderId = yield select(state => state.export.currentOrder.id);
  yield put(fetchSingleOrder(orderId));
}

function* exportSaga() {
  yield takeEvery(FETCH_EXPORTABLE_ORDER_LIST, fetchExportableOrderListSaga);
  yield takeEvery(FETCH_COMPLETED_ORDER_LIST, fetchCompletedOrderListSaga);

  yield takeEvery(EXPORTED_ORDER_ITEM, exportedOrderItemSaga);
  yield takeEvery(COMPLETED_ORDER, completedOrderSaga);
}

export default exportSaga;
