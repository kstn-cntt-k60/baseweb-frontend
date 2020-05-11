export const ADDED_PARTY = "ADDED_PARTY";

export const FETCH_PERSON_LIST = "FETCH_PERSON_LIST";
export const GOT_PERSON_LIST = "GOT_PERSON_LIST";
export const CONFIG_PERSON_TABLE = "CONFIG_PERSON_TABLE";

export const FETCH_CUSTOMER_LIST = "FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "GOT_CUSTOMER_LIST";
export const CONFIG_CUSTOMER_TABLE = "CONFIG_CUSTOMER_TABLE";

export const UPDATED_PERSON = "UPDATED_PERSON";
export const DELETED_PERSON = "DELETED_PERSON";

export const UPDATED_CUSTOMER = "UPDATED_CUSTOMER";
export const DELETED_CUSTOMER = "DELETED_CUSTOMER";

export const GOT_SEARCH_PERSON = "GOT_SEARCH_PERSON";
export const RESET_SEARCH_PERSON = "RESET_SEARCH_PERSON";
export const ADDED_USER_LOGIN = "ADDED_USER_LOGIN";

export const FETCH_USER_LOGIN_LIST = "FETCH_USER_LOGIN_LIST";
export const GOT_USER_LOGIN_LIST = "GOT_USER_LOGIN_LIST";
export const CONFIG_USER_LOGIN_TABLE = "CONFIG_USER_LOGIN_TABLE";

export const UPDATED_USER_LOGIN = "UPDATED_USER_LOGIN";
export const DELETED_USER_LOGIN = "DELETED_USER_LOGIN";

export const fetchPersonList = () => ({
  type: FETCH_PERSON_LIST
});

export const configPersonTable = config => ({
  type: CONFIG_PERSON_TABLE,
  config
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const configCustomerTable = config => ({
  type: CONFIG_CUSTOMER_TABLE,
  config
});

export const resetSearchPerson = () => ({
  type: RESET_SEARCH_PERSON
});

export const fetchUserLoginList = () => ({
  type: FETCH_USER_LOGIN_LIST
});

export const configUserLoginTable = config => ({
  type: CONFIG_USER_LOGIN_TABLE,
  config
});
