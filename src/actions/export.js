import { apiGet, urlWithParams } from "./index";

export const FETCH_EXPORTABLE_ORDER_LIST = "FETCH_EXPORTABLE_ORDER_LIST";
export const CONFIG_EXPORTABLE_ORDER_TABLE = "CONFIG_EXPORTABLE_ORDER_TABLE";
export const GOT_EXPORTABLE_ORDER_LIST = "GOT_EXPORTABLE_ORDER_LIST";

export const GOT_SINGLE_ORDER = "export/GOT_SINGLE_ORDER";

export const EXPORTED_ORDER_ITEM = "EXPORTED_ORDER_ITEM";
export const COMPLETED_ORDER = "COMPLETED_ORDER";

export const FETCH_COMPLETED_ORDER_LIST = "FETCH_COMPLETED_ORDER_LIST";
export const CONFIG_COMPLETED_ORDER_TABLE = "CONFIG_COMPLETED_ORDER_TABLE";
export const GOT_COMPLETED_ORDER_LIST = "GOT_COMPLETED_ORDER_LIST";

export const fetchExportableOrderList = () => ({
  type: FETCH_EXPORTABLE_ORDER_LIST
});

export const configExportableOrderTable = config => ({
  type: CONFIG_EXPORTABLE_ORDER_TABLE,
  config
});

export const fetchSingleOrder = saleOrderId =>
  apiGet(
    urlWithParams("/api/export/view-single-sale-order", { saleOrderId }),
    GOT_SINGLE_ORDER
  );

export const fetchCompletedOrderList = () => ({
  type: FETCH_COMPLETED_ORDER_LIST
});

export const configCompletedOrderTable = config => ({
  type: CONFIG_COMPLETED_ORDER_TABLE,
  config
});
