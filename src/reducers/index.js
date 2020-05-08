import { combineReducers } from "redux";
import auth from "./auth";
import security from "./security";
import notifications from "./notifications";
import account from "./account";
import product from "./product";
import facility from "./facility";
import importReducer from "./import";
import order from "./order";
import exportReducer from "./export";
import salesroute from "./salesroute";

export default combineReducers({
  auth,
  security,
  notifications,
  account,
  order,
  product,
  facility,
  import: importReducer,
  export: exportReducer,
  salesroute
});
