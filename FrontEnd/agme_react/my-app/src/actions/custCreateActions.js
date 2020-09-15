import axios from "axios";
import { GET_ERRORS } from "./types";

export const createCustomer = (newAccount, history) => async dispatch => {
  try {
    const res = await axios.post("http://localhost:8080/api/customer/account", newAccount);
    history.push("/Dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
