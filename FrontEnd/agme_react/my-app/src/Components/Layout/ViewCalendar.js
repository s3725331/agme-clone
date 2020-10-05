import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Inject,ScheduleComponent,Day,Week,WorkWeek,Month,Agenda, ResourceDirective, ResourcesDirective } 
         from '@syncfusion/ej2-react-schedule';


export default class ViewCalendar extends Component {
   localData = [
  {
     Id: 1,
     Subject: 'Appointment',
     StartTime: new Date(2020, 4, 8, 6, 0),
     EndTime: new Date(2020, 4, 8, 7, 0)
   },
   {
     Id: 2,
     Subject: 'Consultantcy',
     StartTime: new Date(2020, 4, 10, 6, 0),
     EndTime: new Date(2020, 4, 10, 7, 0)
  }];
     
  render() { 

    return <ScheduleComponent currentView='Month' eventSettings={{ dataSource: this.localData }}> 
          <ResourcesDirective>
            <ResourceDirective field='ResourceID' title='Worker Name' name='Resources' textField='Name' idField='Id' colorField='Colour'></ResourceDirective>
          </ResourcesDirective>
        <Inject services={[Day,Week,WorkWeek,Month,Agenda]}/>
    </ScheduleComponent>
    
   } 
}


  