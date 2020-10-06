import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda, ResourceDirective, ResourcesDirective } 
         from '@syncfusion/ej2-react-schedule';
         import axios from "axios";


export default class ViewCalendar extends Component {  constructor(props) {
  super(props);

  var user;
  var accountType;

    //checks what kind of user is logged in and saves the user into the user variable
    //while also setting accountType appropriately

    if(localStorage.getItem('customerObject')!== null){ 
      user = JSON.parse(localStorage.getItem('customerObject'));
      accountType = "Customer";
     } 
     
     else if(localStorage.getItem('workerObject')!== null){ 
      
      user = JSON.parse(localStorage.getItem('workerObject'));
      accountType = "Worker";
     }
   

  this.state = {
    profile : user,
    loaded1: false,
    loaded2: false,
    account: accountType,
    localData : []
  };



}

async componentDidMount() {

  try{
    const res = await axios.get("http://localhost:8080/api/bookings/past",{ params: { customerId :
    this.state.profile['id']}});

    
    var data1 = res.data;
    // var data2 = res2.data;

     if(data1.length !==0){
       var startTime;
       var endTime;

     data1.forEach (data => {
       startTime =data['startTime'];
       endTime = data['endTime'];

       const bookObject = {
         Id: data['id'],
         Subject: 'Appointment',
         StartTime: new Date(startTime.substring(0,4),startTime.substring(5,7)-1, startTime.substring(8,10),startTime.substring(11,13), startTime.substring(14,16) ),
         EndTime: new Date(startTime.substring(0,4),endTime.substring(5,7)-1, endTime.substring(8,10),endTime.substring(11,13), startTime.substring(14,16) )
 
 
       };
       this.state.localData.push(bookObject);
     });

   }


    
    this.setState({ loaded1: true });
  } catch (err) {  
    console.log(err)
      if(err.response.status === 404){
        this.setState({ loaded1: true });

        }
  }


  try{

    //if account type is of customer, gets all upcoming bookings with relevant customer id 
    //and stores the state else if account type is of worker, gets all  
    //upcoming bookings with relevant worker id and then sets loaded
    //state to true, which then renders the full page. 

    //if a booking object is not returned, book state stays null and loaded is set to true and page renders
 /*   if(this.state.account === "Customer") {
      const res = await axios.get("http://localhost:8080/api/bookings/upcoming",{ params: { customerId :
      this.state.profile['id']}});
      console.log(res.data)

      this.setState({ book: res.data, loaded: true });

    } else if (this.state.account === "Worker") {

      const res = await axios.get("http://localhost:8080/api/bookings/upcoming",{ params: { workerId :
      this.state.profile['id']}});

      this.setState({ book: res.data, loaded: true });
    }*/
   
      const res = await axios.get("http://localhost:8080/api/bookings/upcoming",{ params: { customerId :
      this.state.profile['id']}});





    

      var data1 = res.data;
     // var data2 = res2.data;

      if(data1.length !==0){
        var startTime;
        var endTime;

      data1.forEach (data => {
        startTime =data['startTime'];
        endTime = data['endTime'];

        const bookObject = {
          Id: data['id'],
          Subject: 'Appointment',
          Name:data['worker']['firstName'],
          StartTime: new Date(startTime.substring(0,4),startTime.substring(5,7)-1, startTime.substring(8,10),startTime.substring(11,13), startTime.substring(14,16) ),
          EndTime: new Date(startTime.substring(0,4),endTime.substring(5,7)-1, endTime.substring(8,10),endTime.substring(11,13), startTime.substring(14,16) )
  
  
        };
        this.state.localData.push(bookObject);
      });

    }


      

    

    

      this.setState({ loaded2: true });

  }   catch (err) {  
    console.log(err)
      if(err.response.status === 404){
        this.setState({ loaded2: true });

        }
  }
}

     
  render() { 

    if (!this.state.loaded1 || !this.state.loaded2) {
      return null;
    }

    return( <ScheduleComponent height='550px' currentView='Month' eventSettings={{ dataSource: this.state.localData }}> 
      {/*    <ResourcesDirective>
            <ResourceDirective field='ResourceID' title='Worker Name' name='Resources' textField='Name' idField='Id' colorField='Colour'></ResourceDirective>
        
            </ResourcesDirective>
      */}
            <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
    </ScheduleComponent>);
    
   } 
}


  