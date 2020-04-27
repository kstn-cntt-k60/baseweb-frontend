export const CONFIG_CUSTOMER_TABLE = "order/CONFIG_CUSTOMER_TABLE";
export const FETCH_CUSTOMER_LIST = "order/FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "order/GOT_CUSTOMER_LIST";

export const FETCH_WAREHOUSE_LIST = "order/FETCH_WAREHOUSE_LIST";
export const CONFIG_WAREHOUSE_TABLE = "order/CONFIG_WAREHOUSE_TABLE";
export const GOT_WAREHOUSE_LIST = "order/GOT_WAREHOUSE_LIST";

export const CONFIG_PRICING_TABLE = "order/CONFIG_PRICING_TABLE";
export const FETCH_PRODUCT_INFO_LIST = "order/FETCH_PRODUCT_INFO_LIST";
export const GOT_PRODUCT_INFO_LIST = "order/GOT_PRODUCT_INFO_LIST";

export const CONFIG_CUSTOMER_STORE_TABLE = "order/CONFIG_CUSTOMER_STORE_TABLE";
export const FETCH_CUSTOMER_STORE_LIST = "order/FETCH_CUSTOMER_STORE_LIST";
export const GOT_CUSTOMER_STORE_LIST = "order/GOT_CUSTOMER_STORE_LIST";

export const ADDED_ORDER = "ADDED_ORDER";
export const ADD_ORDER_FAILED = "ADD_ORDER_FAILED";

export const configCustomerTable = config => ({
  type: CONFIG_CUSTOMER_TABLE,
  config
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const configWarehouseTable = config => ({
  type: CONFIG_WAREHOUSE_TABLE,
  config
});

export const fetchWarehouseList = () => ({
  type: FETCH_WAREHOUSE_LIST
});

export const configPricingTable = config => ({
  type: CONFIG_PRICING_TABLE,
  config
});

export const fetchProductInfoList = warehouseId => ({
  type: FETCH_PRODUCT_INFO_LIST,
  warehouseId
});

export const configCustomerStoreTable = config => ({
  type: CONFIG_CUSTOMER_STORE_TABLE,
  config
});

export const fetchCustomerStoreList = customerId => ({
  type: FETCH_CUSTOMER_STORE_LIST,
  customerId
});
