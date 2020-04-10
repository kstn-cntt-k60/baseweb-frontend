import { combineReducers } from "redux";
import auth from "./auth";
import security from "./security";
import notifications from "./notifications";
import account from "./account";
import product from "./product";
import facility from "./facility";
import importReducer from "./import";

export default combineReducers({
  auth,
  security,
  notifications,
  account,
  product,
  facility,
  import: importReducer
});
