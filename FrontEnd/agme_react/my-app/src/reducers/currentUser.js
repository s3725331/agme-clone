import { saveAccount } from '../actions/getAccountActions';

const initialState = null;

export default function (state = initialState, action) {
  switch (action.type) {
    case saveAccount:
      return action.payload;
    default:
      return state;
  }
}