import axios from "axios";
import { GET_ERRORS } from "./types";
export const saveAccount = "saveAccount";
export const message = "message";

export const getAccount = (account, password, history) => async dispatch => {
  dispatch({ type: message, payload: null });
  try {
    const res = await axios.get("http://localhost:8080/api/accounts",  { params: { email :
      account}
    })
    
      
     // dispatch({ type: saveAccount, payload: localStorage.getItem("currentUser") });

   if(res.data["password"] === password){
     const userData = res.data;
     delete userData[password];
     localStorage.setItem('currentUser', JSON.stringify(userData));
      
      try{
        const res2 = await axios.get("http://localhost:8080/api/customer",  { params: { accountId :
        userData['id']}
      })
      
       const data2 = res2.data;
        localStorage.setItem('customerObject', JSON.stringify(data2));

  
  } catch (err) {  
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
    }

    try{
   const res3 = await axios.get("http://localhost:8080/api/worker",  { params: { accountId :
    userData['id']}
  })
   const data3 = res3.data;
   
    localStorage.setItem('workerObject', JSON.stringify(data3));

  } 
    catch (err) {  
      console.log(err)
    dispatch({
    type: GET_ERRORS,
    payload: err.response.data
    });
  }
  
      history.push("/Dashboard");
      }  else {

       dispatch({ type: message, payload: "Password" });
  
        history.push("/CustomerLogIn");
     }



 
    
  } catch (err) {  
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
      
    if(err.response.status == 404){
      dispatch({ type: message, payload: "Email" });

    history.push("/CustomerLogIn");

  }}
};
