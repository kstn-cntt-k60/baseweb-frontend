import { takeEvery, put, call, select, delay } from "redux-saga/effects";
import {
  LOGIN,
  loginFailed,
  loginSuceeded,
  LOGIN_SUCEEDED,
  LOGOUT,
  API_REQUEST,
  logoutAction,
  removeNotification,
  PUSH_NOTIFICATION,
  pushErrorNotification
} from "../actions";

import { apiLogin } from "./api";

import securitySaga from "./security";
import accountSaga from "./account";
import productSaga from "./product";
import facilitySaga from "./facility";
import importSaga from "./import";
import orderSaga from "./order";
import exportSaga from "./export";
import salesRouteSaga from "./salesroute";
import scheduleSaga from "./schedule";
import salesmanSaga from "./salesman";

function* loginSaga(action) {
  const response = yield call(apiLogin, action.username, action.password);

  if (response.status === 401) {
    yield put(loginFailed());
  } else if (response.status === 200) {
    const token = response.headers.get("X-Auth-Token");
    const body = yield call(() => response.json());
    yield put(loginSuceeded(token, body.userLogin, body.securityPermissions));
  } else {
    const sequence = yield select(state => state.notifications.sequence);
    yield put(pushErrorNotification(sequence, "Login failed!!!"));
  }
}

function* loginSuceededSaga(action) {
  const auth = {
    token: action.token,
    userLogin: action.userLogin,
    securityPermissions: action.securityPermissions
  };

  yield call(() => localStorage.setItem("auth", JSON.stringify(auth)));
}

function* logoutSaga() {
  yield call(() => localStorage.removeItem("auth"));
}

function* apiRequestSaga(action) {
  const token = yield select(state => state.auth.token);

  const options = {
    method: action.method,
    headers: {
      "X-Auth-Token": token
    }
  };
  const body = JSON.stringify(action.body);

  const postOptions = {
    ...options,
    body,
    headers: { ...options.headers, "Content-Type": "application/json" }
  };
  const response = yield call(
    fetch,
    action.url,
    action.method === "POST" ? postOptions : options
  );

  if (response.status === 401) {
    const previousUrl = yield select(state => state.auth.previousUrl);
    yield put(logoutAction(previousUrl));
  } else if (response.status === 200) {
    const json = yield call(() => response.json());
    yield put({ type: action.actionType, body: json });
  } else {
    if (action.errorActionType) {
      yield put({ type: action.errorActionType, status: response.status });
    } else {
      const sequence = yield select(state => state.notifications.sequence);
      yield put(
        pushErrorNotification(sequence, `Request error: ${response.status}!!!`)
      );
    }
  }
}

function* pushNotificationSaga(action) {
  yield delay(10000);
  yield put(removeNotification(action.id));
}

function* rootSaga() {
  yield takeEvery(LOGIN, loginSaga);
  yield takeEvery(LOGIN_SUCEEDED, loginSuceededSaga);
  yield takeEvery(LOGOUT, logoutSaga);
  yield takeEvery(API_REQUEST, apiRequestSaga);
  yield takeEvery(PUSH_NOTIFICATION, pushNotificationSaga);

  yield* securitySaga();
  yield* accountSaga();
  yield* productSaga();
  yield* orderSaga();
  yield* facilitySaga();
  yield* importSaga();
  yield* exportSaga();
  yield* salesRouteSaga();
  yield* scheduleSaga();
  yield* salesmanSaga();
}

export default rootSaga;
