export const ADDED_PRODUCT = "ADDED_PRODUCT";
export const PRODUCT_CONFIG_TABLE = "PRODUCT_CONFIG_TABLE";
export const FETCH_PRODUCT_LIST = "FETCH_PRODUCT_LIST";
export const GOT_PRODUCT_LIST = "GOT_PRODUCT_LIST";
export const UPDATED_PRODUCT = "UPDATED_PRODUCT";
export const DELETED_PRODUCT = "DELETED_PRODUCT";

export const PRICING_CONFIG_TABLE = "PRICING_CONFIG_TABLE";
export const FETCH_PRODUCT_PRICING_LIST = "FETCH_PRODUCT_PRICING_LIST";
export const GOT_PRODUCT_PRICING_LIST = "GOT_PRODUCT_PRICING_LIST";

export const PRICE_CONFIG_TABLE = "PRICE_CONFIG_TABLE";
export const FETCH_PRODUCT_PRICE_LIST = "FETCH_PRODUCT_PRICE_LIST";
export const GOT_PRODUCT_PRICE_LIST = "GOT_PRODUCT_PRICE_LIST";
export const ADDED_PRODUCT_PRICE = "ADDED_PRODUCT_PRICE";

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

export const pricingConfigTable = (
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
) => ({
  type: PRICING_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder,
  searchText
});

export const fetchProductPricingListAction = () => ({
  type: FETCH_PRODUCT_PRICING_LIST
});

export const priceConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: PRICE_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});

export const fetchProductPriceListAction = productId => ({
  type: FETCH_PRODUCT_PRICE_LIST,
  productId
});
