export const OPEN_ADD_PARTY_DIALOG = "OPEN_ADD_PARTY_DIALOG";
export const CLOSE_ADD_PARTY_DIALOG = "CLOSE_ADD_PARTY_DIALOG";

export const ADD_PARTY = "ADD_PARTY";
export const ADDED_PARTY = "ADDED_PARTY";
export const ADD_PARTY_FAILED = "ADD_PARTY_FAILED";

export const FETCH_PERSON_LIST = "FETCH_PERSON_LIST";
export const GOT_PERSON_LIST = "GOT_PERSON_LIST";
export const PERSON_CONFIG_TABLE = "PERSON_CONFIG_TABLE";

export const FETCH_CUSTOMER_LIST = "FETCH_CUSTOMER_LIST";
export const GOT_CUSTOMER_LIST = "GOT_CUSTOMER_LIST";
export const CUSTOMER_CONFIG_TABLE = "CUSTOMER_CONFIG_TABLE";

export const OPEN_EDIT_PERSON_DIALOG = "OPEN_EDIT_PERSON_DIALOG";
export const CLOSE_EDIT_PERSON_DIALOG = "CLOSE_EDIT_PERSON_DIALOG";

export const UPDATE_PERSON = "UPDATE_PERSON";
export const UPDATED_PERSON = "UPDATED_PERSON";
export const UPDATE_PERSON_FAILED = "UPDATE_PERSON_FAILED";

export const DELETED_PERSON = "DELETED_PERSON";
export const DELETED_CUSTOMER = "DELETED_CUSTOMER";

export const OPEN_EDIT_CUSTOMER_DIALOG = "OPEN_EDIT_CUSTOMER_DIALOG";
export const CLOSE_EDIT_CUSTOMER_DIALOG = "CLOSE_EDIT_CUSTOMER_DIALOG";

export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const UPDATED_CUSTOMER = "UPDATED_CUSTOMER";
export const UPDATE_CUSTOMER_FAILED = "UPDATE_CUSTOMER_FAILED";

export const OPEN_ADD_USER_LOGIN_DIALOG = "OPEN_ADD_USER_LOGIN_DIALOG";
export const CLOSE_ADD_USER_LOGIN_DIALOG = "CLOSE_ADD_USER_LOGIN_DIALOG";

export const GOT_SEARCH_PERSON = "GOT_SEARCH_PERSON";
export const RESET_SEARCH_PERSON = "RESET_SEARCH_PERSON";
export const ADD_USER_LOGIN = "ADD_USER_LOGIN";
export const ADDED_USER_LOGIN = "ADDED_USER_LOGIN";
export const ADD_USER_LOGIN_FAILED = "ADD_USER_LOGIN_FAILED";

export const openAddPartyDialog = () => ({
  type: OPEN_ADD_PARTY_DIALOG
});

export const closeAddPartyDialog = () => ({
  type: CLOSE_ADD_PARTY_DIALOG
});

export const addParty = body => ({
  type: ADD_PARTY,
  body
});

export const fetchPersonList = () => ({
  type: FETCH_PERSON_LIST
});

export const personConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: PERSON_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});

export const fetchCustomerList = () => ({
  type: FETCH_CUSTOMER_LIST
});

export const customerConfigTable = (page, pageSize, sortedBy, sortOrder) => ({
  type: CUSTOMER_CONFIG_TABLE,
  page,
  pageSize,
  sortedBy,
  sortOrder
});

export const openEditPersonDialog = id => ({
  type: OPEN_EDIT_PERSON_DIALOG,
  id
});

export const closeEditPersonDialog = () => ({
  type: CLOSE_EDIT_PERSON_DIALOG
});

export const updatePersonAction = body => ({
  type: UPDATE_PERSON,
  body
});

export const openEditCustomerDialog = id => ({
  type: OPEN_EDIT_CUSTOMER_DIALOG,
  id
});

export const closeEditCustomerDialog = () => ({
  type: CLOSE_EDIT_CUSTOMER_DIALOG
});

export const updateCustomerAction = body => ({
  type: UPDATE_CUSTOMER,
  body
});

export const openAddUserLoginDialog = () => ({
  type: OPEN_ADD_USER_LOGIN_DIALOG
});

export const closeAddUserLoginDialog = () => ({
  type: CLOSE_ADD_USER_LOGIN_DIALOG
});

export const resetSearchPerson = () => ({
  type: RESET_SEARCH_PERSON
});

export const addUserLogin = body => ({
  type: ADD_USER_LOGIN,
  body
});
