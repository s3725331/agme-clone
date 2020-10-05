import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda } from '@syncfusion/ej2-react-schedule';


export default class ViewCalendar extends Component {
     
  render() { 

    return <ScheduleComponent> 
        <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
    </ScheduleComponent>
    
   } 
}


  