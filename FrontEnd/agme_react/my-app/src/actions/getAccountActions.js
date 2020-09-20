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
      
        axios.get("http://localhost:8080/api/customer",  { params: { accountId :
        userData['id']}
      }).then(res1 => {
  
  
       const data1 = res1.data;
       
        localStorage.setItem('customerObject', JSON.stringify(data1));
        console.log(data1);
        //history.push("/Dashboard");
  
    })

    axios.get("http://localhost:8080/api/worker",  { params: { accountId :
    userData['id']}
  }).then(res1 => {


   const data1 = res1.data;
   
    localStorage.setItem('workerObject', JSON.stringify(data1));
    console.log(data1);
    //history.push("/Dashboard");

})

axios.get("http://localhost:8080/api/worker/all").then(res2 => {


const data2 = res2.data;

localStorage.setItem('workerStorage', JSON.stringify(data2));
//history.push("/Dashboard");

})
       



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
