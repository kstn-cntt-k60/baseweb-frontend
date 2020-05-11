import { takeEvery, put, select } from "redux-saga/effects";

import { apiGet, pushSuccessNotification } from "../actions";

import {
  ADDED_PRODUCT,
  FETCH_PRODUCT_LIST,
  GOT_PRODUCT_LIST,
  UPDATED_PRODUCT,
  DELETED_PRODUCT,
  FETCH_PRODUCT_PRICING_LIST,
  GOT_PRODUCT_PRICING_LIST,
  FETCH_PRODUCT_PRICE_LIST,
  GOT_PRODUCT_PRICE_LIST,
  ADDED_PRODUCT_PRICE
} from "../actions/product";

function* fetchProductListSaga() {
  const page = yield select(state => state.product.productPage);
  const pageSize = yield select(state => state.product.productPageSize);
  const sortedBy = yield select(state => state.product.productSortedBy);
  const sortOrder = yield select(state => state.product.productSortOrder);
  const text = yield select(state => state.product.productSearchText);
  const searchText = encodeURIComponent(text);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}&query=${searchText}`;
  yield put(apiGet(`/api/product/view-product?${query}`, GOT_PRODUCT_LIST));
}

function* addedProductSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
  yield* fetchProductListSaga();
}

function* updatedProductSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
}

function* deletedProductSaga() {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Deleted sucessfully"));
  yield* fetchProductListSaga();
}

function* fetchPricingListSaga() {
  const page = yield select(state => state.product.pricingPage);
  const pageSize = yield select(state => state.product.pricingPageSize);
  const sortedBy = yield select(state => state.product.pricingSortedBy);
  const sortOrder = yield select(state => state.product.pricingSortOrder);
  const text = yield select(state => state.product.pricingSearchText);
  const searchText = encodeURIComponent(text);

  const query = `page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}&query=${searchText}`;
  yield put(
    apiGet(
      `/api/product/view-product-pricing?${query}`,
      GOT_PRODUCT_PRICING_LIST
    )
  );
}

function* fetchPriceListSaga(action) {
  const id = action.productId;
  const page = yield select(state => state.product.pricePage);
  const pageSize = yield select(state => state.product.pricePageSize);
  const sortedBy = yield select(state => state.product.priceSortedBy);
  const sortOrder = yield select(state => state.product.priceSortOrder);

  const query = `id=${id}&page=${page}&pageSize=${pageSize}&sortedBy=${sortedBy}&sortOrder=${sortOrder}`;
  yield put(
    apiGet(`/api/product/view-product-price?${query}`, GOT_PRODUCT_PRICE_LIST)
  );
}

function* addedProductPriceSaga(action) {
  const sequence = yield select(state => state.notifications.sequence);
  yield put(pushSuccessNotification(sequence, "Saved sucessfully"));
  yield* fetchPriceListSaga(action.body);
  yield* fetchPricingListSaga();
}

function* productSaga() {
  yield takeEvery(ADDED_PRODUCT, addedProductSaga);
  yield takeEvery(FETCH_PRODUCT_LIST, fetchProductListSaga);
  yield takeEvery(UPDATED_PRODUCT, updatedProductSaga);
  yield takeEvery(DELETED_PRODUCT, deletedProductSaga);

  yield takeEvery(FETCH_PRODUCT_PRICING_LIST, fetchPricingListSaga);
  yield takeEvery(FETCH_PRODUCT_PRICE_LIST, fetchPriceListSaga);
  yield takeEvery(ADDED_PRODUCT_PRICE, addedProductPriceSaga);
}

export default productSaga;
