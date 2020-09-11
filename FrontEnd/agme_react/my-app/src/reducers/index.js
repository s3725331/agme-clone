import {combineReducers} from 'redux';
import loggedReducer from './loggedIn';
import errorReducer from "./errorReducer";

const allReducers = combineReducers({
    errors: errorReducer,
    loggedIn: loggedReducer
})

export default allReducers
