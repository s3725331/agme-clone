import axios from "axios";
import { GET_ERRORS } from "./types";
export const saveAccount = "saveAccount";
export const message = "message";

export const getAccount = (account, password, history) => async dispatch => {

  //sets error message to null, useful for displaying wrong email/password during login
  dispatch({ type: message, payload: null });


  try {
    //get and store account that matches email provided
    const res = await axios.get("http://localhost:8080/api/accounts",  { params: { email :
      account}

    })
    

    //check if password matches, if not, sets error message to wrong password and dispatches to store
   if(res.data["password"] === password){
     const userData = res.data;
     delete userData[password];
     
     //store data of user in localstorage
     localStorage.setItem('currentUser', JSON.stringify(userData));
      
     //try to grab the customer account. if it is not a customer account, object will be null
      try{
        const res2 = await axios.get("http://localhost:8080/api/customer",  { params: { accountId :
        userData['id']}
      })
      
       const data2 = res2.data;
        localStorage.setItem('customerObject', JSON.stringify(data2));

  
      } catch (err) {  
   
         dispatch({
          type: GET_ERRORS,
          payload: err.response.data
        });
        }


        //try to grab the worker account. if it is not a worker account, object will be null
      try{
      const res3 = await axios.get("http://localhost:8080/api/worker",  { params: { accountId :
      userData['id']}
      })
        const data3 = res3.data;
   
      localStorage.setItem('workerObject', JSON.stringify(data3));

      } 
        catch (err) {  
          
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
      
    //if error response is 404, email doesnt exist in database. Set error message to wrong email in store
    if(err.response.status === 404){
      dispatch({ type: message, payload: "Email" });

    history.push("/CustomerLogIn");

  }}
};
