import { takeEvery, put, select } from "redux-saga/effects";

import {
  apiGet,
  urlWithParams,
  pushSuccessNotification,
  pushErrorNotification
} from "../actions";

import {
  FETCH_CUSTOMER_LIST,
  GOT_CUSTOMER_LIST,
  GOT_WAREHOUSE_LIST,
  FETCH_WAREHOUSE_LIST,
  FETCH_PRODUCT_INFO_LIST,
  GOT_PRODUCT_INFO_LIST,
  FETCH_CUSTOMER_STORE_LIST,
  GOT_CUSTOMER_STORE_LIST,
  ADDED_ORDER,
  ADD_ORDER_FAILED,
  FETCH_ORDER_LIST,
  GOT_ORDER_LIST,
  ACCEPTED_SALES_ORDER,
  CANCELED_SALES_ORDER,
  fetchSingleOrder
} from "../actions/order";

function* fetchCustomerListSaga() {
  const config = yield select(state => state.order.add.customerTable);
  yield put(
    apiGet(
      urlWithParams("/api/account/view-customer", config),
      GOT_CUSTOMER_LIST
    )
  );
}

function* fetchWarehouseListSaga() {
  const config = yield select(state => state.order.add.warehouseTable);

  yield put(
    apiGet(
      urlWithParams("/api/facility/view-warehouse", {
        ...config,
        query: config.searchText
      }),
      GOT_WAREHOUSE_LIST
    )
  );
}

function* fetchProductInfoListSaga(action) {
  const config = yield select(state => state.order.add.productInfoTable);
  const warehouseId = action.warehouseId;

  yield put(
    apiGet(
      urlWithParams("/api/order/view-product-info-by-warehouse", {
        ...config,
        warehouseId
      }),
      GOT_PRODUCT_INFO_LIST
    )
  );
}

function* fetchCustomerStoreListSaga(action) {
  const config = yield select(state => state.order.add.storeTable);
  const customerId = action.customerId;

  yield put(
    apiGet(
      urlWithParams("/api/order/view-customer-store-by-customer", {
        ...config,
        customerId
      }),
      GOT_CUSTOMER_STORE_LIST
    )
  );
}

function* addedOrderSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Add order sucessfully"));
}

function* addOrderFailedSaga({ status }) {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(
    pushErrorNotification(sequence, `Add order failed!!! (code ${status})`)
  );
}

function* fetchOrderListSaga() {
  const config = yield select(state => state.order.view.orderTable);

  yield put(
    apiGet(urlWithParams("/api/order/view-sale-order", config), GOT_ORDER_LIST)
  );
}

function* acceptedSalesOrderSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Accept order sucessfully"));

  const orderId = yield select(state => state.order.view.currentOrder.id);
  yield put(fetchSingleOrder(orderId));
}

function* canceledSalesOrderSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Cancel order sucessfully"));

  const orderId = yield select(state => state.order.view.currentOrder.id);
  yield put(fetchSingleOrder(orderId));
}

function* orderSaga() {
  yield takeEvery(FETCH_CUSTOMER_LIST, fetchCustomerListSaga);
  yield takeEvery(FETCH_WAREHOUSE_LIST, fetchWarehouseListSaga);
  yield takeEvery(FETCH_PRODUCT_INFO_LIST, fetchProductInfoListSaga);
  yield takeEvery(FETCH_CUSTOMER_STORE_LIST, fetchCustomerStoreListSaga);
  yield takeEvery(ADDED_ORDER, addedOrderSaga);
  yield takeEvery(ADD_ORDER_FAILED, addOrderFailedSaga);

  yield takeEvery(FETCH_ORDER_LIST, fetchOrderListSaga);

  yield takeEvery(ACCEPTED_SALES_ORDER, acceptedSalesOrderSaga);
  yield takeEvery(CANCELED_SALES_ORDER, canceledSalesOrderSaga);
}

export default orderSaga;
