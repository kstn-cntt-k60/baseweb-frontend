export const FETCH_WAREHOUSE_LIST = "FETCH_WAREHOUSE_LIST";
export const GOT_WAREHOUSE_LIST = "GOT_WAREHOUSE_LIST";

export const CONFIG_WAREHOUSE_TABLE = "CONFIG_WAREHOUSE_TABLE";
export const ADDED_WAREHOUSE = "ADDED_WAREHOUSE";

export const UPDATED_WAREHOUSE = "UPDATED_WAREHOUSE";
export const DELETED_WAREHOUSE = "DELETED_WAREHOUSE";

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
