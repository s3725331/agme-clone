import { combineReducers, createStore } from "redux";
import errorReducer from "./errorReducer";
import loggedInReducer from './loggedInReducer';
import currentReducer from './currentUser';

const rootReducer = combineReducers({
  errors: errorReducer,
  loggedIn: loggedInReducer,
  currentUser:currentReducer,
})

export default rootReducer
