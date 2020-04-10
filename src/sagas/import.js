import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, pushSuccessNotification } from "../actions";
import {
  FETCH_WAREHOUSE_LIST,
  GOT_WAREHOUSE_LIST,
  FETCH_PRODUCT_LIST_BY_WAREHOUSE,
  GOT_PRODUCT_LIST_BY_WAREHOUSE,
  ADDED_INVENTORY_ITEM,
  FETCH_INVENTORY_BY_WAREHOUSE,
  GOT_INVENTORY_LIST,
  FETCH_PRODUCT_INVENTORY_ITEMS,
  GOT_PRODUCT_INVENTORY_ITEMS,
  GOT_WAREHOUSE
} from "../actions/import";

import { urlWithParams } from "../actions";
import { matchPath } from "react-router";

function* fetchWarehouseListSaga() {
  const config = yield select(state => state.import.warehouseTable);

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

function* fetchProductListByWarehouseSaga(action) {
  const config = yield select(state => state.import.productTable);

  yield put(
    apiGet(
      urlWithParams("/api/import/view-product-by-warehouse", {
        ...config,
        warehouseId: action.id,
        query: config.searchText
      }),
      GOT_PRODUCT_LIST_BY_WAREHOUSE
    )
  );
}

function* fetchInventoryByWarehouseSaga(action) {
  const config = yield select(state => state.import.inventoryTable);

  yield put(
    apiGet(
      urlWithParams("/api/import/view-inventory-by-warehouse", {
        ...config,
        warehouseId: action.id
      }),
      GOT_INVENTORY_LIST
    )
  );
}

function* addedInventoryItemSaga(action) {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));

  const path = window.location.pathname;

  const matchWarehouse = matchPath(path, {
    path: "/import-export/import-warehouse/:warehouseId",
    strict: false
  });
  if (matchWarehouse) {
    yield* fetchProductListByWarehouseSaga({ id: action.body.warehouseId });
    yield* fetchInventoryByWarehouseSaga({ id: action.body.warehouseId });
  }

  const matchProduct = matchPath(path, {
    path: "/import-export/import-warehouse-product/:warehouseId/:productId",
    strict: false
  });
  if (matchProduct) {
    const { warehouseId, productId } = matchProduct.params;
    yield* fetchProductInventoryItemsSaga({ warehouseId, productId });
  }
}

function* fetchProductInventoryItemsSaga(action) {
  const config = yield select(state => state.import.productInventoryTable);
  const { warehouseId, productId } = action;
  const warehouseMap = yield select(state => state.import.warehouseMap);
  const warehouse = warehouseMap[warehouseId];

  if (!warehouse) {
    yield put(
      apiGet(`/api/facility/get-warehouse/${warehouseId}`, GOT_WAREHOUSE)
    );
  }

  yield put(
    apiGet(
      urlWithParams("/api/import/view-inventory-by-product", {
        ...config,
        warehouseId,
        productId
      }),
      GOT_PRODUCT_INVENTORY_ITEMS
    )
  );
}

function* importSaga() {
  yield takeEvery(FETCH_WAREHOUSE_LIST, fetchWarehouseListSaga);
  yield takeEvery(
    FETCH_PRODUCT_LIST_BY_WAREHOUSE,
    fetchProductListByWarehouseSaga
  );
  yield takeEvery(ADDED_INVENTORY_ITEM, addedInventoryItemSaga);
  yield takeEvery(FETCH_INVENTORY_BY_WAREHOUSE, fetchInventoryByWarehouseSaga);

  yield takeEvery(
    FETCH_PRODUCT_INVENTORY_ITEMS,
    fetchProductInventoryItemsSaga
  );
}

export default importSaga;
