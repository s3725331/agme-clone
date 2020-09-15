import axios from "axios";
import { GET_ERRORS } from "./types";

export const saveAccount = "saveAccount";

export const getAccount = (account, password, history) => async dispatch => {
  try {
    axios.get("http://localhost:8080/api/accounts",  { params: { email :
      account}
    }).then(res => {
     // dispatch({ type: saveAccount, payload: localStorage.getItem("currentUser") });

   if(res.data["password"] === password){
     const userData = res.data;
     delete userData[password];
      localStorage.setItem('currentUser', JSON.stringify(userData));
      history.push("/Dashboard");
      }  else {
        //TODO wrong password
     }
  })
;

 
    
  } catch (err) {  
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  

  }
};
