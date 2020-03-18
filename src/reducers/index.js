import { combineReducers } from "redux";
import auth from "./auth";
import security from "./security";
import notifications from "./notifications";
import account from "./account";
import util from "./util";

export default combineReducers({
  auth,
  security,
  notifications,
  account,
  util
});
