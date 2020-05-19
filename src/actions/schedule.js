export const FETCH_SALESMAN_LIST = "schedule/FETCH_SALESMAN_LIST";
export const GOT_SALESMAN_LIST = "schedule/GOT_SALESMAN_LIST";
export const CONFIG_SALESMAN_TABLE = "schedule/CONFIG_SALESMAN_TABLE";

export const FETCH_PLANNING_LIST = "schedule/FETCH_PLANNING_LIST";
export const GOT_PLANNING_LIST = "schedule/GOT_PLANNING_LIST";
export const CONFIG_PLANNING_TABLE = "schedule/CONFIG_PLANNING_TABLE";

export const FETCH_CONFIG_LIST = "schedule/FETCH_CONFIG_LIST";
export const GOT_CONFIG_LIST = "schedule/GOT_CONFIG_LIST";
export const CONFIG_CONFIG_TABLE = "schedule/CONFIG_CONFIG_TABLE";

export const CONFIG_CUSTOMER_TABLE = "schedule/CONFIG_CUSTOMER_TABLE";
export const FETCH_CUSTOMER_LIST = "schedule/FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "schedule/GOT_CUSTOMER_LIST";

export const ADDED_SCHEDULE = "ADDED_SCHEDULE";
export const ADD_SCHEDULE_FAILED = "ADD_SCHEDULE_FAILED";
export const DELETED_SCHEDULE = "DELETED_SCHEDULE";

export const CONFIG_SCHEDULE_TABLE = "schedule/CONFIG_SCHEDULE_TABLE";
export const FETCH_SCHEDULE_LIST = "schedule/FETCH_SCHEDULE_LIST";
export const GOT_SCHEDULE_LIST = "schedule/GOT_SCHEDULE_LIST";
export const GOT_SCHEDULE = "schedule/GOT_SCHEDULE";

export const fetchSalesmanList = () => ({
  type: FETCH_SALESMAN_LIST
});

export const configSalesmanTable = config => ({
  type: CONFIG_SALESMAN_TABLE,
  config
});

export const fetchPlanningList = () => ({
  type: FETCH_PLANNING_LIST
});

export const configPlanningTable = config => ({
  type: CONFIG_PLANNING_TABLE,
  config
});

export const fetchConfigList = () => ({
  type: FETCH_CONFIG_LIST
});

export const configConfigTable = config => ({
  type: CONFIG_CONFIG_TABLE,
  config
});

export const configCustomerTable = config => ({
  type: CONFIG_CUSTOMER_TABLE,
  config
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const configScheduleTable = config => ({
  type: CONFIG_SCHEDULE_TABLE,
  config
});

export const fetchScheduleList = () => ({
  type: FETCH_SCHEDULE_LIST
});
