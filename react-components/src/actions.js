export const CHANGE_PASSWORD = "CHANGE_PASSWORD";
export const CHANGE_USERNAME = "CHANGE_USERNAME";
export const INITIALIZE_FORM = "INITIALIZE_FORM";
export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA_SUCCESS = "RECEIVE_DATA_SUCCESS";
export const RECEIVE_DATA_FAILED = "RECEIVE_DATA_FAILED";

//action creaters
export const changeUserName = userName => ({
  type: CHANGE_USERNAME,
  userName
});
export const changePassword = password => ({
  type: CHANGE_PASSWORD,
  password
});

export const initializeForm = () => ({
  type: INITIALIZE_FORM
});

export const requestData = () => ({
  type: REQUEST_DATA
});

export const receiveDataSuccess = userArray => ({
  type: RECEIVE_DATA_SUCCESS,
  userArray
});

export const receiveDataFailed = () => ({
  type: RECEIVE_DATA_FAILED
});
