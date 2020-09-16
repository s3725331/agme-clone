import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loggedReducer from './loggedIn';

export default combineReducers({
  errors: errorReducer,
  loggedIn: loggedReducer
});


