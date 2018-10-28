import { combineReducers } from "redux";
import {
  CHANGE_USERNAME,
  CHANGE_PASSWORD,
  INITIALIZE_FORM,
  REQUEST_DATA,
  RECEIVE_DATA_SUCCESS,
  RECEIVE_DATA_FAILED
} from "./actions";
const initialState = {
  Info: {
    userName: "",
    password: ""
  },
  Users: {
    isFetching: false,
    userArray: []
  }
};

const formReducer = (state = initialState.Info, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        userName: action.userName
      };
    case INITIALIZE_FORM:
      return initialState.Info;
    default:
      return state;
  }
};

const usersReducer = (state = initialState.Users, action) => {
  switch (action.type) {
    case REQUEST_DATA:
      return {
        ...state,
        isFetching: true
      };
    case RECEIVE_DATA_SUCCESS:
      return {
        ...state,
        isFetching: false,
        userArray: action.userArray
      };
    case RECEIVE_DATA_FAILED:
      return {
        ...state,
        isFetching: false
      };

    default:
      return state;
  }
};

const rootReducer = combineReducers({
  form: formReducer,
  user: usersReducer
});

export default rootReducer;
