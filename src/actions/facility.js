export const FETCH_WAREHOUSE_LIST = "FETCH_WAREHOUSE_LIST";
export const GOT_WAREHOUSE_LIST = "GOT_WAREHOUSE_LIST";

export const CONFIG_WAREHOUSE_TABLE = "CONFIG_WAREHOUSE_TABLE";
export const ADDED_WAREHOUSE = "ADDED_WAREHOUSE";

export const UPDATED_WAREHOUSE = "UPDATED_WAREHOUSE";
export const DELETED_WAREHOUSE = "DELETED_WAREHOUSE";

export const FETCH_CUSTOMER_STORE_LIST = "FETCH_CUSTOMER_STORE_LIST";
export const GOT_CUSTOMER_STORE_LIST = "GOT_CUSTOMER_STORE_LIST";

export const FETCH_ALL_CUSTOMER_STORE = "FETCH_ALL_CUSTOMER_STORE";
export const GOT_ALL_CUSTOMER_STORE = "GOT_ALL_CUSTOMER_STORE";

export const CONFIG_CUSTOMER_STORE_TABLE = "CONFIG_CUSTOMER_STORE_TABLE";
export const ADDED_CUSTOMER_STORE = "ADDED_CUSTOMER_STORE";
export const ADD_FAILED_CUSTOMER_STORE = "ADD_FAILED_CUSTOMER_STORE";

export const GOT_SEARCH_CUSTOMER = "facility/GOT_SEARCH_CUSTOMER";

export const UPDATED_CUSTOMER_STORE = "UPDATED_CUSTOMER_STORE";
export const DELETED_CUSTOMER_STORE = "DELETED_CUSTOMER_STORE";

export const FETCH_PAIR_STORE_SALESMAN = "FETCH_PAIR_STORE_SALESMAN";
export const GOT_PAIR_STORE_SALESMAN = "GOT_PAIR_STORE_SALESMAN";

export const fetchWarehouseList = () => ({
  type: FETCH_WAREHOUSE_LIST
});

export const configWarehouseTable = (
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
) => ({
  type: CONFIG_WAREHOUSE_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
});

export const fetchCustomerStoreList = () => ({
  type: FETCH_CUSTOMER_STORE_LIST
});

export const fetchAllCustomerStore = () => ({
  type: FETCH_ALL_CUSTOMER_STORE
});

export const configCustomerStoreTable = (
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
) => ({
  type: CONFIG_CUSTOMER_STORE_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
});

export const fetchPairStoreSalesman = () => ({
  type: FETCH_PAIR_STORE_SALESMAN
});
