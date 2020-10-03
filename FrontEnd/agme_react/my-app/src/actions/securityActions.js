import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import setJWTTOken from "../securityUtils/setJWTToken";
import jwt_decode from "jwt-decode"; 

export const createAccount = (newAccount, service, type, history) => async dispatch => {
  try {
      //if account type is of Customer, a customer account is created, else a worker account is created
      
      const res = await axios.post("http://localhost:8080/api/users/register", newAccount);

      const test = {      username : newAccount['username'],
        password : newAccount['password']}
      const res1 = await axios.post("http://localhost:8080/api/users/login",  test);
      const { token } = res1.data;

      console.log(res)
      console.log(res1)
  
      localStorage.setItem("jwtToken", token);

      setJWTTOken(token);

      const res3 = await axios.post("http://localhost:8080/api/customer");
      console.log(res3)


    //  if(type === "Customer"){
   //     const  res1 = await axios.post("http://localhost:8080/api/customer", newAccount);
    //  } else if (type === "Worker"){
    //    const  res2 = await axios.post("http://localhost:8080/api/worker", newAccount, { params: { service :
    //    service}});
   //   }
    
    history.push("/Dashboard");


  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
}

export const login = LoginRequest => async dispatch =>{
  try{
    console.log(LoginRequest)
    const res = await axios.post("http://localhost:8080/api/users/login",  LoginRequest);


    console.log(res)

    const { token } = res.data;

    console.log(token)

    localStorage.setItem("jwtToken", token);
    setJWTTOken(token);
    const decoded = jwt_decode(token);

    dispatch({

      type: SET_CURRENT_USER,
      payload:decoded
    });


  } catch(err){
    dispatch({

      type:GET_ERRORS,
      payload:err.response.data

    });


  }

}

export const loginTEST = (account, password, history) => async dispatch => {

  //sets error message to null, useful for displaying wrong email/password during login
  //dispatch({ type: message, payload: null });


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


      try{
        const res4 = await axios.get("http://localhost:8080/api/admin",  { params: { accountId :
        userData['id']}
        })
          const data4 = res4.data;
     
        localStorage.setItem('adminObject', JSON.stringify(data4));
  
        } 
          catch (err) {  
            
            dispatch({
              type: GET_ERRORS,
              payload: err.response.data
            });
        }
  
      history.push("/Dashboard");
      }  else {

       //dispatch({ type: message, payload: "Password" });
  
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
      //dispatch({ type: message, payload: "Email" });

    history.push("/CustomerLogIn");

  }}
};



