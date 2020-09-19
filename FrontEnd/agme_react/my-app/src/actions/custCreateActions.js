import axios from "axios";
import { GET_ERRORS } from "./types";

export const createCustomer = (newAccount, type, history) => async dispatch => {
  try {

      if(type === "Customer"){
        const  res1 = await axios.post("http://localhost:8080/api/customer/account", newAccount);
      } else if (type === "Worker"){
        const  res2 = await axios.post("http://localhost:8080/api/worker/account", newAccount);
      }
    
    history.push("/Dashboard");
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
