export const FETCH_WAREHOUSE_LIST = "import/FETCH_WAREHOUSE_LIST";
export const GOT_WAREHOUSE_LIST = "import/GOT_WAREHOUSE_LIST";
export const GOT_WAREHOUSE = "import/GOT_WAREHOUSE";

export const CONFIG_WAREHOUSE_TABLE = "import/CONFIG_WAREHOUSE_TABLE";

export const CONFIG_PRODUCT_TABLE = "import/CONFIG_PRODUCT_TABLE";

export const FETCH_PRODUCT_LIST_BY_WAREHOUSE =
  "FETCH_PRODUCT_LIST_BY_WAREHOUSE";
export const GOT_PRODUCT_LIST_BY_WAREHOUSE = "GOT_PRODUCT_LIST_BY_WAREHOUSE";
export const ADDED_INVENTORY_ITEM = "ADDED_INVENTORY_ITEM";

export const FETCH_INVENTORY_BY_WAREHOUSE = "FETCH_INVENTORY_BY_WAREHOUSE";
export const CONFIG_INVENTORY_ITEM_TABLE = "CONFIG_INVENTORY_ITEM_TABLE";
export const GOT_INVENTORY_LIST = "GOT_INVENTORY_LIST";

export const FETCH_PRODUCT_INVENTORY_ITEMS = "FETCH_PRODUCT_INVENTORY_ITEMS";
export const CONFIG_PRODUCT_INVENTORY_TABLE = "CONFIG_PRODUCT_INVENTORY_TABLE";
export const GOT_PRODUCT_INVENTORY_ITEMS = "GOT_PRODUCT_INVENTORY_ITEMS";

export const fetchWarehouseList = () => ({
  type: FETCH_WAREHOUSE_LIST
});

export const configWarehouseTable = config => ({
  type: CONFIG_WAREHOUSE_TABLE,
  config
});

export const configProductTable = config => ({
  type: CONFIG_PRODUCT_TABLE,
  config
});

export const fetchProductListByWarehouse = id => ({
  type: FETCH_PRODUCT_LIST_BY_WAREHOUSE,
  id
});

export const fetchInventoryItemListByWarehouse = id => ({
  type: FETCH_INVENTORY_BY_WAREHOUSE,
  id
});

export const configInventoryItemTable = config => ({
  type: CONFIG_INVENTORY_ITEM_TABLE,
  config
});

export const fetchProductInventoryItems = (warehouseId, productId) => ({
  type: FETCH_PRODUCT_INVENTORY_ITEMS,
  warehouseId,
  productId
});

export const configProductInventoryItemTable = config => ({
  type: CONFIG_PRODUCT_INVENTORY_TABLE,
  config
});
