export const ADDED_PRODUCT = "ADDED_PRODUCT";
export const PRODUCT_CONFIG_TABLE = "PRODUCT_CONFIG_TABLE";
export const FETCH_PRODUCT_LIST = "FETCH_PRODUCT_LIST";
export const GOT_PRODUCT_LIST = "GOT_PRODUCT_LIST";
export const UPDATED_PRODUCT = "UPDATED_PRODUCT";
export const DELETED_PRODUCT = "DELETED_PRODUCT";

export const productConfigTable = (
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
) => ({
  type: PRODUCT_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
});

export const fetchProductListAction = () => ({
  type: FETCH_PRODUCT_LIST
});
