import { message } from '../actions/getAccountActions';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case message:
      return action.payload;
    default:
      return state;
  }
}