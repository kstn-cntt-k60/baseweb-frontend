import {
  PRODUCT_CONFIG_TABLE,
  GOT_PRODUCT_LIST,
  UPDATED_PRODUCT,
  PRICING_CONFIG_TABLE,
  GOT_PRODUCT_PRICING_LIST,
  PRICE_CONFIG_TABLE,
  GOT_PRODUCT_PRICE_LIST
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
  productSearchText: "",

  pricingMap: {},
  pricingIdList: [],
  pricingCount: 0,
  pricingPriceMap: {},
  pricingPage: 0,
  pricingPageSize: 5,
  pricingSortedBy: "createdAt",
  pricingSortOrder: "desc",
  pricingSearchText: "",

  priceMap: {},
  priceIdList: [],
  priceCount: 0,
  pricePage: 0,
  pricePageSize: 5,
  priceSortedBy: "createdAt",
  priceSortOrder: "desc"
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

    case PRICING_CONFIG_TABLE:
      return {
        ...state,
        pricingPage: action.page,
        pricingPageSize: action.pageSize,
        pricingSortedBy: action.sortedBy,
        pricingSortOrder: action.sortOrder,
        pricingSearchText: action.searchText
      };

    case GOT_PRODUCT_PRICING_LIST:
      return {
        ...state,
        pricingMap: arrayToObjectWithId(action.body.productList),
        pricingIdList: action.body.productList.map(p => p.id),
        pricingCount: action.body.productCount,
        pricingPriceMap: arrayToObjectWithId(action.body.priceList)
      };

    case PRICE_CONFIG_TABLE:
      return {
        ...state,
        pricePage: action.page,
        pricePageSize: action.pageSize,
        priceSortedBy: action.sortedBy,
        priceSortOrder: action.sortOrder
      };

    case GOT_PRODUCT_PRICE_LIST:
      return {
        ...state,
        priceMap: arrayToObjectWithId(action.body.priceList),
        priceIdList: action.body.priceList.map(p => p.id),
        priceCount: action.body.priceCount
      };

    default:
      return state;
  }
};

export default product;
