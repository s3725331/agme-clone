import {combineReducers} from 'redux';
import loggedReducer from './loggedIn';

const allReducers = combineReducers({
    loggedIn: loggedReducer
})

export default allReducers
