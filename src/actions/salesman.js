export const FETCH_USER_LOGIN_LIST = "salesman/FETCH_USER_LOGIN_LIST";
export const GOT_USER_LOGIN_LIST = "salesman/GOT_USER_LOGIN_LIST";
export const CONFIG_USER_LOGIN_TABLE = "salesman/CONFIG_USER_LOGIN_TABLE";

export const ADDED_SALESMAN = "ADDED_SALESMAN";
export const ADD_SALESMAN_FAILED = "ADD_SALESMAN_FAILED";
export const DELETED_SALESMAN = "DELETED_SALESMAN";

export const CONFIG_SCHEDULE_TABLE = "salesman/CONFIG_SCHEDULE_TABLE";
export const FETCH_SCHEDULE_LIST = "salesman/FETCH_SCHEDULE_LIST";
export const GOT_SCHEDULE_LIST = "salesman/GOT_SCHEDULE_LIST";
export const GOT_SCHEDULE = "salesman/GOT_SCHEDULE";

export const ADDED_CHECKIN = "ADDED_CHECKIN";
export const ADD_CHECKIN_FAILED = "ADD_CHECKIN_FAILED";

export const CONFIG_PLANNING_TABLE = "salesman/CONFIG_PLANNING_TABLE";
export const FETCH_PLANNING_LIST = "salesman/FETCH_PLANNING_LIST";
export const GOT_PLANNING_LIST = "salesman/GOT_PLANNING_LIST";

export const CONFIG_CUSTOMER_TABLE = "salesman/CONFIG_CUSTOMER_TABLE";
export const FETCH_CUSTOMER_LIST = "salesman/FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "salesman/GOT_CUSTOMER_LIST";

export const CONFIG_CHECKIN_HISTORY_TABLE =
  "salesman/CONFIG_CHECKIN_HISTORY_TABLE";
export const FETCH_CHECKIN_HISTORY_LIST = "salesman/FETCH_CHECKIN_HISTORY_LIST";
export const GOT_CHECKIN_HISTORY_LIST = "salesman/GOT_CHECKIN_HISTORY_LIST";

export const fetchUserLoginList = () => ({
  type: FETCH_USER_LOGIN_LIST
});

export const configUserLoginTable = config => ({
  type: CONFIG_USER_LOGIN_TABLE,
  config
});

export const configScheduleTable = config => ({
  type: CONFIG_SCHEDULE_TABLE,
  config
});

export const fetchScheduleList = () => ({
  type: FETCH_SCHEDULE_LIST
});

export const configPlanningTable = config => ({
  type: CONFIG_PLANNING_TABLE,
  config
});

export const fetchPlanningList = () => ({
  type: FETCH_PLANNING_LIST
});

export const configCustomerTable = config => ({
  type: CONFIG_CUSTOMER_TABLE,
  config
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const configChekinHistoryTable = config => ({
  type: CONFIG_CHECKIN_HISTORY_TABLE,
  config
});

export const fetchCheckinHistoryList = () => ({
  type: FETCH_CHECKIN_HISTORY_LIST
});
