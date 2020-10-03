import axios from "axios";
import { GET_ERRORS } from "./types";

export const updateAccount = (newAccount,  type, history) => async dispatch => {
 
  try {
      //if account type is of Customer, a customer account is created, else a worker account is created
      if(type === "Customer"){
        const  res1 = await axios.put("http://localhost:8080/api/customer", newAccount);
        localStorage.setItem('customerObject', JSON.stringify(res1.data));
      } else if (type === "Worker"){
        const  res2 = await axios.put("http://localhost:8080/api/worker", newAccount);
        localStorage.setItem('workerObject', JSON.stringify(res2.data));
      }else if (type === "Admin"){
        const  res3 = await axios.put("http://localhost:8080/api/accounts", newAccount);

        var adminObj = JSON.parse(localStorage.getItem("adminObject"));
        adminObj['account']= res3.data;

        localStorage.setItem('adminObject', JSON.stringify(adminObj));
      }
    
    history.push("/Dashboard");
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
