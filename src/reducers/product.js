import {
  PRODUCT_CONFIG_TABLE,
  GOT_PRODUCT_LIST,
  UPDATED_PRODUCT
} from "../actions/product";

import { arrayToObjectWithId } from "../util";

const initialState = {
  productMap: {},
  productIdList: [],
  productCount: 0,
  productPage: 0,
  productPageSize: 5,
  productSortedBy: "createdAt",
  productSortOrder: "desc",
  productSearchText: ""
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case PRODUCT_CONFIG_TABLE:
      return {
        ...state,
        productPage: action.page,
        productPageSize: action.pageSize,
        productSortedBy: action.sortedBy,
        productSortOrder: action.sortOrder,
        productSearchText: action.searchText
      };

    case GOT_PRODUCT_LIST:
      return {
        ...state,
        productMap: arrayToObjectWithId(action.body.productList),
        productIdList: action.body.productList.map(p => p.id),
        productCount: action.body.productCount
      };

    case UPDATED_PRODUCT:
      return {
        ...state,
        productMap: {
          ...state.productMap,
          [action.body.id]: action.body
        }
      };

    default:
      return state;
  }
};

export default product;
