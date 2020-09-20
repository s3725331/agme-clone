import { combineReducers, createStore } from "redux";
import errorReducer from "./errorReducer";
import loggedInReducer from './loggedInReducer';
import currentReducer from './currentUser';
import messageReducer from './errorMessage';

const rootReducer = combineReducers({
  errors: errorReducer,
  loggedIn: loggedInReducer,
  currentUser:currentReducer,
  message:messageReducer
})

export default rootReducer
