export const FETCH_SALESMAN_LIST = "FETCH_SALESMAN_LIST";
export const GOT_SALESMAN_LIST = "GOT_SALESMAN_LIST";
export const CONFIG_SALESMAN_TABLE = "CONFIG_SALESMAN_TABLE";

export const FETCH_PLANNING_LIST = "FETCH_PLANNING_LIST";
export const GOT_PLANNING_LIST = "GOT_PLANNING_LIST";
export const CONFIG_PLANNING_TABLE = "CONFIG_PLANNING_TABLE";
export const GOT_PLANNING = "GOT_PLANNING";

export const ADDED_PLANNING_PERIOD = "ADDED_PLANNING_PERIOD";
export const UPDATED_PLANNING_PERIOD = "UPDATED_PLANNING_PERIOD";
export const DELETED_PLANNING_PERIOD = "DELETED_PLANNING_PERIOD";

export const FETCH_CONFIG_LIST = "FETCH_CONFIG_LIST";
export const GOT_CONFIG_LIST = "GOT_CONFIG_LIST";
export const CONFIG_CONFIG_TABLE = "CONFIG_CONFIG_TABLE";
export const GOT_CONFIG = "GOT_CONFIG";

export const ADDED_CONFIG = "ADDED_CONFIG";
export const UPDATED_CONFIG = "UPDATED_CONFIG";
export const DELETED_CONFIG = "DELETED_CONFIG";

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
