import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import loggedReducer from './loggedIn';
import currentReducer from './currentUser';

export default combineReducers({
  errors: errorReducer,
  loggedIn: loggedReducer,
  currentUser:currentReducer
});
