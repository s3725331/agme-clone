import axios from "axios";
import { GET_ERRORS } from "./types";

export const approveWorker = (workId, history) => async dispatch => {
 
  try {
      //if account type is of Customer, a customer account is created, else a worker account is created

        const  res1 = await axios.patch("http://localhost:8080/api/worker/authenticate", null,{ params: { workerId :
        workId}
        } );

    
    history.push("/WorkerConfirmation");
    history.go(0);
  } catch (err) {
    console.log(err)
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    });
  }
};
